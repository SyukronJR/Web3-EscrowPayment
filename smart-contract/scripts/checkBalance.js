const { ethers } = require("hardhat");

async function main() {
  const token = await ethers.getContractAt(
    "MockUSDC",
    "0x32A79565F56a77821F7b2e6608db8e46CF38C5db",
  );

  const buyer = "0x28512E6FC122e8c14AdcF2B576dd9f691F39428f";

  const balance = await token.balanceOf(buyer);

  console.log("Buyer Balance:", ethers.formatUnits(balance, 18));
}

main().catch(console.error);
