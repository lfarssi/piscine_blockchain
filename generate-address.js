// generate-address.js
const crypto = require('node:crypto');

function generateAddress() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
    namedCurve: 'secp256k1',
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
  });

  // Re-import PEM so Node can export the exact SPKI DER bytes to hash.
  const publicKeyDer = crypto
    .createPublicKey(publicKey)
    .export({ type: 'spki', format: 'der' });

  const hash = crypto
    .createHash('sha256')
    .update(publicKeyDer)
    .digest('hex');

  return {
    privateKey,
    publicKey,
    address: `01${hash}`,
  };
}

module.exports = { generateAddress };