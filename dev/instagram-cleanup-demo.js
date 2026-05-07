const { stripSocialNoise } = require("../server.js");

const before = `1,485 likes,
82 comments
- chefkeluc on May 7, 2026: "Chicken over rice! ⭐️⭐️⭐️⭐️⭐️ Wat een beuker van een gerecht!

Ingrediënten voor 2 bakken chicken over rice
250g gele rijst
400g kipdijfilet
1 tl komijn
1 tl paprikapoeder

See translation
Original audio"`;

const after = stripSocialNoise(before);

console.log("=== BEFORE ===");
console.log(before);
console.log("\n=== AFTER ===");
console.log(after);
