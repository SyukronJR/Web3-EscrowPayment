import { getContract } from "./contract";

export async function confirmRelease(
  escrowId: number
) {
  const contract = await getContract();

  const tx = await contract.confirmRelease(
    escrowId
  );

  await tx.wait();

  const saveTx = await contract.saveTxHash(
    escrowId,
    tx.hash
  );

  await saveTx.wait();

  return tx.hash;
}