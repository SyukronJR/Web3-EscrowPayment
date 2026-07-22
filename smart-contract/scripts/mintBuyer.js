const { ethers } = require("hardhat");

async function mint(contractName, tokenAddress, buyer) {
  const token = await ethers.getContractAt(contractName, tokenAddress);

  const tx = await token.mint(buyer, ethers.parseUnits("1000", 18));

  await tx.wait();

  console.log(`${contractName} berhasil di-mint`);
}

async function main() {
  const buyer = "0x28512E6FC122e8c14AdcF2B576dd9f691F39428f";

  await mint("MockUSDC", "0x32A79565F56a77821F7b2e6608db8e46CF38C5db", buyer);

  await mint("MockUSDT", "0x0754aae2f458f035BBaf9054A4F18CE5ee300608", buyer);

  await mint("MockDAI", "0x48A38d2734603e6b15466A9D1ECaA5e061591985", buyer);

  await mint("MockLINK", "0x30E3b7E6909a5e2A9D39e170662dbd2e037b44dE", buyer);
}

main().catch(console.error);
