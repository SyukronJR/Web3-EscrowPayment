import { BrowserProvider, Interface } from "ethers";
import EscrowPayment from "@/abi/EscrowPayment.json";
import { CONTRACT_ADDRESS } from "@/constants/contract";

export async function getLatestTxHash(
  escrowId: number
) {
  const apiKey =
    process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

  const url =
    `https://api-sepolia.etherscan.io/api` +
    `?module=account` +
    `&action=txlist` +
    `&address=${CONTRACT_ADDRESS}` +
    `&sort=desc` +
    `&apikey=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  console.log("Etherscan:", data);

  console.log(data);

  if (data.status !== "1") return "-";

  if (!window.ethereum) return "-";

  const provider = new BrowserProvider(
    window.ethereum
  );

  const iface = new Interface(
    EscrowPayment.abi
  );

  for (const tx of data.result) {
    const receipt =
      await provider.getTransactionReceipt(
        tx.hash
      );

      console.log("Receipt:", tx.hash, receipt);

    if (!receipt) continue;

    for (const log of receipt.logs) {
      if (
        log.address.toLowerCase() !==
        CONTRACT_ADDRESS.toLowerCase()
      )
        continue;

      try {
        const parsed = iface.parseLog(log);

        console.log(parsed?.name, parsed?.args);

        const eventEscrowId = Number(
          parsed?.args?.escrowId
        );

        if (eventEscrowId === escrowId) {
          return tx.hash;
        }
      } catch {
        // bukan event EscrowPayment
      }
    }
  }

  return "-";

  console.log("Tidak menemukan tx untuk escrow:", escrowId);
}