/**
 * Cloudflare Worker — AH API proxy voor Plately
 *
 * Zet dit als een Cloudflare Worker. Stel een env-secret in:
 *   PLATELY_SECRET = <willekeurige string — zelfde als AH_API_PROXY_SECRET op de server>
 *
 * Alle requests van de server (die AH_API_PROXY=https://<worker>.workers.dev instelt)
 * worden doorgestuurd naar api.ah.nl of www.ah.nl op basis van het pad.
 *
 * Routes:
 *   /mobile-auth/*   → https://api.ah.nl
 *   /mobile-services/* → https://api.ah.nl
 *   /gql             → https://www.ah.nl
 *   /allerhande/*    → https://www.ah.nl
 */

const WWW_PATHS = new Set(["/gql"]);
const WWW_PREFIXES = ["/allerhande/"];

export default {
  async fetch(request, env) {
    // Verificeer het gedeelde geheim
    const secret = env.PLATELY_SECRET || "";
    if (secret) {
      const provided = request.headers.get("x-plately-secret") || "";
      if (provided !== secret) {
        return new Response("Forbidden", { status: 403 });
      }
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Bepaal doel-host op basis van het pad
    const isWww =
      WWW_PATHS.has(path) ||
      WWW_PREFIXES.some((p) => path.startsWith(p));
    const targetBase = isWww ? "https://www.ah.nl" : "https://api.ah.nl";
    const targetUrl = targetBase + path + (url.search || "");

    // Kopieer headers, verwijder proxy-specifieke headers
    const headers = new Headers(request.headers);
    headers.delete("x-plately-secret");
    headers.delete("host");
    // Zorg dat AH de Worker niet herkent als bot
    if (!headers.has("user-agent")) {
      headers.set("user-agent", "Mozilla/5.0 (compatible; Plately/1.0)");
    }

    let body = null;
    if (request.method !== "GET" && request.method !== "HEAD") {
      body = await request.arrayBuffer();
    }

    const upstream = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: body ?? undefined,
    });

    // Stuur de AH-response terug met CORS-headers zodat de server er bij kan
    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.set("access-control-allow-origin", "*");

    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  },
};
