/**
 * Dev smoke script: hit local channel-search for Culy (prints first 5 hits).
 *
 * Usage:
 *   node dev/culy-search-check.js pasta 5055
 */

const query = String(process.argv[2] || "pasta").trim();
const port = Number.parseInt(String(process.argv[3] || "5055"), 10) || 5055;

async function main() {
  const url = `http://localhost:${port}/api/channel-search?q=${encodeURIComponent(query)}&channels=ch-culy`;
  const resp = await fetch(url);
  const json = await resp.json();
  const results = Array.isArray(json?.results) ? json.results : [];
  const top = results.slice(0, 5);

  console.log(`query=${JSON.stringify(query)} port=${port} ok=${Boolean(json?.ok)} total=${results.length}`);
  top.forEach((r, i) => {
    console.log(`${i + 1}. ${r.title || "(no title)"}`);
    console.log(`   ${r.url || ""}`);
    if (r.thumbnail) console.log(`   img ${String(r.thumbnail).slice(0, 120)}${String(r.thumbnail).length > 120 ? "…" : ""}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
