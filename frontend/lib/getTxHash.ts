import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY!;

export async function getTxHash(
  contract: string,
  escrowId: number
): Promise<string> {

  const url =
    `https://api-sepolia.etherscan.io/api` +
    `?module=account` +
    `&action=txlist` +
    `&address=${contract}` +
    `&sort=desc` +
    `&apikey=${API_KEY}`;

  const { data } = await axios.get(url);

  if (data.status !== "1") return "-";

  for (const tx of data.result) {

    // Method ID confirmRelease(uint256)
    if (!tx.input.startsWith("0xba6bc66e"))
      continue;

    const id = parseInt(
      tx.input.slice(10),
      16
    );

    if (id === escrowId)
      return tx.hash;
  }

  return "-";
}