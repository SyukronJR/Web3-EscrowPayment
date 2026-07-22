const { ethers } = require("hardhat");

async function main() {

    const [deployer] = await ethers.getSigners();

    console.log("=================================");
    console.log("Deploying Contract...");
    console.log("=================================");

    console.log("Deployer :", deployer.address);

    console.log(
        "Balance  :",
        ethers.formatEther(
            await ethers.provider.getBalance(deployer.address)
        ),
        "ETH"
    );

    // Wallet penerima platform fee
    const platformWallet = deployer.address;

    const EscrowPayment = await ethers.getContractFactory(
        "EscrowPayment"
    );

    const escrow = await EscrowPayment.deploy(
        platformWallet
    );

    await escrow.waitForDeployment();

    console.log("=================================");
    console.log("EscrowPayment deployed!");
    console.log("=================================");

    console.log(
        "Contract Address:",
        await escrow.getAddress()
    );

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});