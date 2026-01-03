//
// TimeProofs v0.2 — Test complet API + SDK
//

// ⚠️ IMPORTANT : remplace cette URL par l’URL EXACTE de ton Worker v0.2 Cloudflare
const BASE = "https://timeproofs-api-v02.jeason-bacoul.workers.dev";

// -----------------------------------------------------------------------------
// Utilitaires
// -----------------------------------------------------------------------------
async function sha256HexNode(buffer) {
  const crypto = require("crypto");
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

// -----------------------------------------------------------------------------
// Test principal
// -----------------------------------------------------------------------------
async function main() {
  console.log("=== TimeProofs v0.2 — Test complet ===");

  // 1. Générer un hash local
  const sample = Buffer.from("hello-v02");
  const hash = await sha256HexNode(sample);

  console.log("\n[1] HASH LOCAL");
  console.log("SHA-256 =", hash);

  // 2. Appeler /api/timestamp
  console.log("\n[2] APPEL /api/timestamp …");

  const response = await fetch(BASE + "/api/timestamp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hash })
  });

  const ts = await response.json();

  console.log("Réponse API v0.2:");
  console.log(ts);

  if (!response.ok) {
    console.error("\n❌ L’API a renvoyé une erreur.");
    return;
  }

  // 3. Construire le bundle
  console.log("\n[3] CONSTRUCTION DU .tproof.json …");

  const bundle = {
    version: "timeproofs-0.2",
    hash: ts.hash,
    timestamp: ts.timestamp,
    proof: ts.proof,
    meta: {
      type: "test",
      purpose: "v0.2 demo"
    }
  };

  console.log("Bundle généré :");
  console.log(bundle);

  // 4. Écrire un fichier local pour vérifier
  const fs = require("fs");
  fs.writeFileSync("sample-v02.tproof.json", JSON.stringify(bundle, null, 2));

  console.log("\n[4] FICHIER BUNDLE ÉCRIT : sample-v02.tproof.json");

  console.log("\n=== TEST TERMINÉ ===");
}

main().catch((err) => {
  console.error("Erreur:", err);
});
