/**
 * Dev smoke script: hit local channel-search for Culy.
 *
 * Usage:
 *   node dev/culy-search-check.js surinaamse 5070
 */

const query = String(process.argv[2] || "surinaamse").trim();
const port = Number.parseInt(String(process.argv[3] || "5055"), 10) || 5055;

async function main() {
  const url = `http://localhost:${port}/api/channel-search?q=${encodeURIComponent(query)}&channels=ch-culy`;
  const resp = await fetch(url);
  const json = await resp.json();
  const results = Array.isArray(json?.results) ? json.results : [];
  console.log(JSON.stringify({
    ok: Boolean(json?.ok),
    query,
    port,
    count: results.length,
    sample: results.slice(0, 5).map((r) => ({ title: r.title, url: r.url, thumbnail: r.thumbnail })),
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

