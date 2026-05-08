/**
 * Dev smoke script: fetch a Culy recipe via Jina reader and
 * print the extracted title/intro/ingredients/instructions/image.
 *
 * Usage:
 *   node dev/culy-import-check.js "https://www.culy.nl/recepten/..."
 */
const url = process.argv[2] || "https://www.culy.nl/recepten/surinaamse-soep-van-gele-erwten-klassieke-pesi-met-zoutvlees-en-kip/";

function sanitizeText(input) {
  return String(input || "")
    .replace(/\s+/g, " ")
    .replace(/\u00a0/g, " ")
    .trim();
}

function extractMarkdownSection(text, headingPattern, stopPattern) {
  const regex = new RegExp(
    `(?:^|\\n)#{2,3}\\s*(?:${headingPattern})(?:\\s+[^\\n]*)?\\s*\\n([\\s\\S]*?)(?=\\n#{2,3}\\s*(?:${stopPattern})(?:\\s+[^\\n]*)?$|$)`,
    "gi"
  );
  const matches = [...String(text || "").matchAll(regex)];
  if (!matches.length) return "";

  const scoreSection = (body) => {
    const lines = String(body || "")
      .split(/\n+/)
      .map((l) => sanitizeText(l))
      .filter(Boolean);
    if (!lines.length) return 0;
    const bulletish = lines.filter((l) => /^(\*|-|\d+\.)\s+\S/.test(l)).length;
    const hasNumbers = lines.filter((l) => /\d/.test(l)).length;
    const lengthPenalty = Math.max(0, lines.length - 70) * 6;
    return bulletish * 3 + hasNumbers + Math.min(lines.length, 40) - lengthPenalty;
  };

  let best = matches[0][1] || "";
  let bestScore = scoreSection(best);
  for (const m of matches.slice(1)) {
    const body = m[1] || "";
    const s = scoreSection(body);
    if (s > bestScore) {
      best = body;
      bestScore = s;
    }
  }
  return String(best || "").trim();
}

function extractFirstImageUrlFromMarkdown(markdown) {
  const text = String(markdown || "");
  const matches = [...text.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)];
  for (const m of matches) {
    const raw = String(m[1] || "").trim();
    if (!raw) continue;
    const encodedIdx = raw.indexOf("https%3A%2F%2F");
    if (encodedIdx >= 0) {
      const encoded = raw.slice(encodedIdx);
      try {
        const decoded = decodeURIComponent(encoded);
        if (/^https?:\/\/.+\.(?:jpg|jpeg|png|webp)(?:\?.*)?$/i.test(decoded)) return decoded;
      } catch {}
    }
    if (/^https?:\/\/.+\.(?:jpg|jpeg|png|webp)(?:\?.*)?$/i.test(raw)) return raw;
  }
  return "";
}

function extractIntro(markdown) {
  const lines = String(markdown || "")
    .split(/\n+/)
    .map((l) => sanitizeText(l.replace(/^#{1,6}\s*/, "")))
    .filter(Boolean);
  for (const line of lines.slice(0, 80)) {
    if (/^(voorbereiding|kooktijd|beoordeling|bron:|direct in je mandje)/i.test(line)) continue;
    if (/^##\s/i.test(line)) break;
    if (line.length >= 30) return line;
  }
  return "";
}

async function main() {
  const readerUrl = `https://r.jina.ai/${url}`;
  const res = await fetch(readerUrl, {
    headers: {
      accept: "text/plain, text/markdown;q=0.9, */*;q=0.8",
      "x-with-links-summary": "true",
      "user-agent": "plately-dev-script",
    },
  });
  const text = await res.text();
  if (!res.ok) {
    console.error("Failed:", res.status, text.slice(0, 300));
    process.exit(1);
  }

  const ingredientSection = extractMarkdownSection(
    text,
    "ingredi[eë]nten|ingredienten|ingredients?|dit heb je nodig",
    "aan de slag|bereiding|bereidingswijze|voedingswaarden|boodschappen|services|ontdek|gerelateerde|ook te zien|direct in je mandje|beoordeling"
  );
  const instructionSection = extractMarkdownSection(
    text,
    "aan de slag|bereiding|bereidingswijze|instructions?|method",
    "voedingswaarden|ingredi[eë]nten|ingredienten|boodschappen|services"
  );

  const ingredients = ingredientSection
    .split(/\n+/)
    .map((l) => sanitizeText(l))
    .filter((l) => /^(\*|-)\s+\S/.test(l) || /^\d+\b/.test(l))
    .map((l) => sanitizeText(l.replace(/^(\*|-)\s+/, "")))
    .filter((l) => l && !/^voor\s+\d+/i.test(l) && !/^direct in je mandje/i.test(l));

  const instructions = instructionSection
    .split(/\n+/)
    .map((l) => sanitizeText(l))
    .filter((l) => /^(\d+[\.\)]|\*|-)\s+\S/.test(l))
    .map((l) => sanitizeText(l.replace(/^\d+[\.\)]\s*/, "").replace(/^(\*|-)\s*/, "")))
    .filter(Boolean);

  const title = sanitizeText(text.match(/^\s*#\s+(.+)$/m)?.[1] || "");
  const intro = extractIntro(text);
  const image = extractFirstImageUrlFromMarkdown(text);

  console.log(JSON.stringify({ url, title, intro, image, ingredientsCount: ingredients.length, stepsCount: instructions.length, ingredients: ingredients.slice(0, 8), steps: instructions.slice(0, 5) }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

