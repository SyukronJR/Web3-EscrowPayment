const { ethers } = require("hardhat");

async function check(contractName, tokenAddress, seller) {
  const token = await ethers.getContractAt(contractName, tokenAddress);

  const balance = await token.balanceOf(seller);

  console.log(`${contractName}: ${ethers.formatUnits(balance, 18)}`);
}

async function main() {
  // GANTI DENGAN ADDRESS SELLER
  const seller = "0xeeaAd2a52B45EF1162eb8bdcC67AB9c749594E50";

  await check("MockUSDC", "0x32A79565F56a77821F7b2e6608db8e46CF38C5db", seller);

  await check("MockUSDT", "0x0754aae2f458f035BBaf9054A4F18CE5ee300608", seller);

  await check("MockDAI", "0x48A38d2734603e6b15466A9D1ECaA5e061591985", seller);

  await check("MockLINK", "0x30E3b7E6909a5e2A9D39e170662dbd2e037b44dE", seller);
}

main().catch(console.error);
