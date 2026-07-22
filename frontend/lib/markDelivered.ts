import { getContract } from "@/lib/contract";

export async function markDelivered(
  escrowId: number
) {

  const contract = await getContract();

  const tx = await contract.markDelivered(
    escrowId
  );

  await tx.wait();

  return tx.hash;

}