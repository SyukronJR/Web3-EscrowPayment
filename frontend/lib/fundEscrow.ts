import { getContract } from "@/lib/contract";
import { BrowserProvider, ethers } from "ethers";

export async function fundEscrow(
  escrowId: number,
  token: string,
  amount: string,
) {
  const contract = await getContract();

  if (token === "0x0000000000000000000000000000000000000000") {
    const tx = await contract.fund(escrowId, {
      value: BigInt(amount),
    });

    await tx.wait();

    return tx.hash;
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const erc20 = new ethers.Contract(
    token,
    [
      "function approve(address spender,uint256 amount) returns(bool)",
      "function balanceOf(address owner) view returns(uint256)",
      "function allowance(address owner,address spender) view returns(uint256)",
    ],
    signer,
  );

  const balance = await erc20.balanceOf(await signer.getAddress());

  console.log("MockUSDC Balance:", balance.toString());

  const approveTx = await erc20.approve(contract.target, BigInt(amount));

  await approveTx.wait();

  const allowance = await erc20.allowance(
    await signer.getAddress(),
    contract.target,
  );

  console.log("Allowance:", ethers.formatUnits(allowance, 18));

  const tx = await contract.fund(escrowId);

  await tx.wait();

  return tx.hash;
}
