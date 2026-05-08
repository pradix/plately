/**
 * Dev script: print the "usedUrl" that normal channel-search and the admin tester
 * should generate for the same channel + query.
 *
 * This does NOT hit the network; it reuses the exact same helpers from `server.js`.
 *
 * Usage:
 *   node dev/channel-used-url-check.js seed ch-culy "pasta pesto"
 *   node dev/channel-used-url-check.js custom my-ch "pasta pesto" "https://example.com"
 */

async function main() {
  const kind = String(process.argv[2] || "seed").trim(); // seed | custom
  const channelId = String(process.argv[3] || "").trim();
  const query = String(process.argv[4] || "").trim();
  const customUrl = String(process.argv[5] || "").trim();

  if (!channelId || !query) {
    console.error("Usage: node dev/channel-used-url-check.js <seed|custom> <channelId> <query> [customBaseUrl]");
    process.exit(1);
  }

  const srv = require("../server.js");
  const dev = srv && srv.__dev ? srv.__dev : null;
  if (!dev) {
    console.error("server.js did not expose __dev helpers");
    process.exit(1);
  }

  if (kind === "custom") {
    if (!customUrl) {
      console.error("For custom kind, provide customBaseUrl as the 5th argument.");
      process.exit(1);
    }
    const channelOverrides = await dev.getChannelOverrides();
    const eff = dev.getEffectiveCustomChannelConfig({ channelId, url: customUrl }, channelOverrides);
    const usedUrl = dev.buildSeedSearchUrlFromTemplate(eff.searchUrlTemplate, query);
    console.log(JSON.stringify({
      kind,
      channelId,
      query,
      usedUrl,
      usedSearchUrlTemplate: eff.searchUrlTemplate,
      usedBaseUrl: eff.baseUrl,
      override: eff.override,
      defaults: {
        baseUrl: eff.defaultBaseUrl,
        searchUrlTemplate: eff.defaultSearchUrlTemplate,
      },
    }, null, 2));
    return;
  }

  const overrides = await dev.getSeedChannelOverrides();
  const eff = dev.getEffectiveSeedChannelConfig(channelId, overrides);
  const usedSearchUrlTemplate = dev.getSeedChannelSearchUrlTemplate(channelId, eff);
  const usedUrl = dev.buildSeedChannelSearchUrl(channelId, eff, query);

  console.log(JSON.stringify({
    kind: "seed",
    channelId,
    query,
    usedUrl,
    usedSearchUrlTemplate,
    usedBaseUrl: eff.baseUrl,
    override: eff.override,
    defaults: {
      baseUrl: eff.defaultBaseUrl,
      searchUrlTemplate: eff.defaultSearchUrlTemplate,
    },
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

