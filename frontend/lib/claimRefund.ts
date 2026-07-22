import { getContract } from "@/lib/contract";

export async function claimRefund(
  escrowId: number
) {
  const contract = await getContract();

  const tx = await contract.claimTimeoutRefund(
    escrowId
  );

  await tx.wait();

  localStorage.setItem(
    `escrow-tx-${escrowId}`,
    tx.hash
  );

  return tx.hash;
}