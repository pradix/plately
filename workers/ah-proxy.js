/**
 * Cloudflare Worker — AH API proxy voor Plately
 *
 * Waarom: api.ah.nl blokkeert het VPS-IP van de Plately server (HTTP 403).
 * Deze worker relay't alle /ah/* requests naar api.ah.nl via Cloudflare's
 * netwerk, waarvan de IPs niet geblokkeerd zijn.
 *
 * Setup (eenmalig, ~5 min):
 *  1. Ga naar https://workers.cloudflare.com/ en log in (gratis account)
 *  2. Maak een nieuwe Worker aan, plak deze code
 *  3. Stel een Secret in: Settings → Variables → Add variable
 *     Name: PLATELY_SECRET   Value: (zelf verzonnen wachtwoord)
 *  4. Deploy de worker, noteer de URL (bijv. ah-proxy.jouw-naam.workers.dev)
 *  5. Op de VPS: stel twee env-vars in (bijv. in /etc/environment of PM2 config):
 *       AH_API_PROXY=https://ah-proxy.jouw-naam.workers.dev
 *       AH_API_PROXY_SECRET=<zelfde wachtwoord als stap 3>
 *  6. pm2 restart plately
 *
 * Limiet: gratis CF Workers = 100.000 requests/dag — ruim voldoende.
 */
export default {
  async fetch(request, env) {
    // Verify shared secret so only the Plately server can use this proxy.
    const secret = request.headers.get("x-plately-secret");
    if (!env.PLATELY_SECRET || secret !== env.PLATELY_SECRET) {
      return new Response("Forbidden", { status: 403 });
    }

    const url = new URL(request.url);
    const pathname = url.pathname;

    // Route naar het juiste AH-domein op basis van het pad:
    //   /gql, /allerhande/* → www.ah.nl  (GraphQL + receptenzoeker)
    //   al het overige       → api.ah.nl  (mobile auth + product search)
    const isWwwPath = pathname === "/gql" || pathname.startsWith("/allerhande/");
    const baseTarget = isWwwPath ? "https://www.ah.nl" : "https://api.ah.nl";
    const ahPath = pathname.replace(/^\/ah/, "") || "/";
    const ahUrl = baseTarget + ahPath + url.search;

    const headers = new Headers(request.headers);
    headers.delete("x-plately-secret");
    headers.delete("host");

    try {
      const ahResponse = await fetch(ahUrl, {
        method: request.method,
        headers,
        body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
      });

      // Pass response through, allow any origin for server-to-server calls.
      const responseHeaders = new Headers(ahResponse.headers);
      responseHeaders.set("Access-Control-Allow-Origin", "*");

      return new Response(ahResponse.body, {
        status: ahResponse.status,
        headers: responseHeaders,
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: String(err?.message || err) }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
