import { BrowserProvider, Contract } from "ethers";
import EscrowPayment from "@/abi/EscrowPayment.json";
import { CONTRACT_ADDRESS } from "@/constants/contract";

export async function getContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask belum terpasang.");
  }

  const provider = new BrowserProvider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();

  return new Contract(
    CONTRACT_ADDRESS,
    EscrowPayment.abi,
    signer
  );
}

export async function getReadOnlyContract() {

  if (!window.ethereum)
    throw new Error("MetaMask belum terpasang.");

  const provider =
    new BrowserProvider(window.ethereum);

  return new Contract(
    CONTRACT_ADDRESS,
    EscrowPayment.abi,
    provider
  );

}