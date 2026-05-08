#!/usr/bin/env node
"use strict";

let webpush;
try {
  webpush = require("web-push");
} catch (err) {
  console.error("Missing dependency 'web-push'. Run: npm install");
  process.exit(1);
}

const keys = webpush.generateVAPIDKeys();

process.stdout.write(
  [
    "",
    "VAPID keys generated.",
    "",
    "Add these to your .env:",
    "",
    `VAPID_PUBLIC_KEY=${keys.publicKey}`,
    `VAPID_PRIVATE_KEY=${keys.privateKey}`,
    "VAPID_SUBJECT=mailto:you@example.com",
    "",
  ].join("\n")
);

