const { ethers } = require("hardhat");

async function deployToken(name) {
  const Factory = await ethers.getContractFactory(name);

  const token = await Factory.deploy();

  await token.waitForDeployment();

  console.log(`${name} : ${await token.getAddress()}`);

  return token;
}

async function main() {

  console.log("==============================");

  console.log("Deploy Mock ERC20");

  console.log("==============================");

  await deployToken("MockUSDT");

  await deployToken("MockUSDC");

  await deployToken("MockDAI");

  await deployToken("MockLINK");

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});