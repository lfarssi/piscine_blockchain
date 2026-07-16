import { ethers } from "ethers";

async function sendEther(amount, address) {
  const Provider =
    ethers.JsonRpcProvider || ethers.providers.JsonRpcProvider;

  const provider = new Provider("http://localhost:8545");
  const signer = await provider.getSigner();

  const parseEther =
    ethers.parseEther || ethers.utils.parseEther;

  const tx = await signer.sendTransaction({
    to: address,
    value: parseEther(String(amount)),
  });

  return tx.hash;
}

export { sendEther as "module.exports" };