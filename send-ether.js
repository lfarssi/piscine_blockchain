import { ethers } from "ethers";

async function sendEther(amount, address) {
  const Provider =
    ethers.JsonRpcProvider || ethers.providers.JsonRpcProvider;

  const provider = new Provider("http://localhost:8545");
  const signer = await provider.getSigner(0);

  const parseEther =
    ethers.parseEther || ethers.utils.parseEther;

  const tx = await signer.sendTransaction({
    to: address,
    value: parseEther(amount.toString()),
  });

  return tx.hash;
}

export { sendEther as "module.exports" };