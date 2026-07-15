const { generateKeyPairSync: g, createHash: h } = require("crypto");
globalThis.generateAddress = () => {
  const a = g("ec", {
      namedCurve: "secp256k1",
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
      publicKeyEncoding: { type: "spki", format: "pem" },
    }),
    b = g("ec", {
      namedCurve: "secp256k1",
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
      publicKeyEncoding: { type: "spki", format: "der" },
    });
  return {
    privateKey: a.privateKey,
    publicKey: a.publicKey,
    address: "01" + h("sha256").update(b.publicKey).digest("hex"),
  };
};
