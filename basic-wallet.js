const crypto = require('crypto');
const fs = require('fs');

const WALLET_FILE = 'wallet.pem';

function addressFromPublicKey(publicKey) {
  const publicKeyDer = crypto
    .createPublicKey(publicKey)
    .export({ type: 'spki', format: 'der' });

  const hash = crypto
    .createHash('sha256')
    .update(publicKeyDer)
    .digest('hex');

  return `01${hash}`;
}

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

  fs.writeFileSync(WALLET_FILE, privateKey, {
    encoding: 'utf8',
    mode: 0o600,
  });

  return addressFromPublicKey(publicKey);
}

function createTransaction(amount, recipient) {
  if (!Number.isInteger(amount) || amount < 0) {
    throw new TypeError('amount must be a non-negative integer');
  }

  const privateKey = fs.readFileSync(WALLET_FILE, 'utf8');
  const publicKey = crypto.createPublicKey(privateKey);

  const sender = addressFromPublicKey(publicKey);
  const hexAmount = amount.toString(16);
  const dataToSign = sender + recipient + hexAmount;

  const signature = crypto
    .sign('sha256', Buffer.from(dataToSign, 'utf8'), privateKey)
    .toString('hex');

  return dataToSign + signature;
}