import { getContract } from "@/lib/contract";

export async function createEscrow(
  seller: string,
  token: string,
  amount: bigint,
  deadline: number
) {
  const contract = await getContract();

  const tx = await contract.createEscrow(
    seller,
    token,
    amount,
    deadline
  );

  await tx.wait();

  return tx.hash;
}