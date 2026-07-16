import { ethers } from "ethers";
import crypto from "node:crypto";

async function sendHash(text) {
  const Provider =
    ethers.JsonRpcProvider || ethers.providers.JsonRpcProvider;

  const provider = new Provider("http://localhost:8545");
  const signer = await provider.getSigner(0);

  const hash = crypto
    .createHash("sha256")
    .update(text)
    .digest("hex");

  const tx = await signer.sendTransaction({
    to: await signer.getAddress(),
    value: 0,
    data: "0x" + hash,
  });

  return tx.hash;
}

export { sendHash as "module.exports" };