/**
 * Regression smoke script for generic ordered-list step prefix stripping.
 *
 * Usage:
 *   node dev/generic-numbered-steps-regression.js
 */
const path = require("path");
const fs = require("fs");

const fixturePath = path.join(__dirname, "fixtures", "generic-numbered-steps.json");
const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));

const { __dev } = require("../server");
const finalizeInstructionSteps = __dev?.finalizeInstructionSteps;

if (typeof finalizeInstructionSteps !== "function") {
  console.error("Missing __dev.finalizeInstructionSteps export in server.js");
  process.exit(2);
}

const out = finalizeInstructionSteps(fixture.rawSteps || []);
const expected = fixture.expectedSteps || [];

const hasNumberPrefix = out.some((s) => /^\s*\d+\s*[.)]\s+/.test(String(s || "")));
const hasStapPrefix = out.some((s) => /^\s*stap\s*\d+\s*[:\-]\s*/i.test(String(s || "")));
const matchesExpected = expected.length ? JSON.stringify(out) === JSON.stringify(expected) : true;

const ok = !hasNumberPrefix && !hasStapPrefix && matchesExpected;

console.log(
  JSON.stringify(
    {
      fixture: path.basename(fixturePath),
      inputCount: (fixture.rawSteps || []).length,
      outputCount: out.length,
      output: out,
      hasNumberPrefix,
      hasStapPrefix,
      matchesExpected,
      ok,
    },
    null,
    2
  )
);

process.exit(ok ? 0 : 1);

