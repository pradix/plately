/**
 * Regression smoke script for Uit Paulines Keuken style numbering.
 *
 * Usage:
 *   node dev/pauline-steps-regression.js
 */
const path = require("path");
const fs = require("fs");

const fixturePath = path.join(__dirname, "fixtures", "pauline-numbered-steps.json");
const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));

const { __dev } = require("../server");
const finalizeInstructionSteps = __dev?.finalizeInstructionSteps;

if (typeof finalizeInstructionSteps !== "function") {
  console.error("Missing __dev.finalizeInstructionSteps export in server.js");
  process.exit(2);
}

const out = finalizeInstructionSteps(fixture.rawSteps || []);

const numberOnly = out.filter((s) => /^\d{1,3}\s*[.)-]?\s*$/.test(String(s || "").trim()));
const ok = fixture.expectedNoNumberOnlySteps ? numberOnly.length === 0 : true;

console.log(
  JSON.stringify(
    {
      fixture: path.basename(fixturePath),
      inputCount: (fixture.rawSteps || []).length,
      outputCount: out.length,
      outputPreview: out.slice(0, 8),
      numberOnlySteps: numberOnly,
      ok,
    },
    null,
    2
  )
);

process.exit(ok ? 0 : 1);

