const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EscrowPayment", function () {
  let escrow;

  let owner;
  let buyer;
  let seller;
  let other;

  const ONE_ETH = ethers.parseEther("1");\

  beforeEach(async function () {
    [owner, buyer, seller, other] = await ethers.getSigners();

    const EscrowPayment = await ethers.getContractFactory("EscrowPayment");

    escrow = await EscrowPayment.deploy(owner.address);

    await escrow.waitForDeployment();
  });

  // CREATE ESCROW

  it("Should create escrow", async function () {
    const deadline =
      (await ethers.provider.getBlock("latest")).timestamp + 86400;

    await escrow.connect(buyer).createEscrow(
      seller.address,

      ethers.ZeroAddress,

      ONE_ETH,

      deadline,
    );

    const e = await escrow.getEscrow(1);

    expect(e.buyer).to.equal(buyer.address);

    expect(e.seller).to.equal(seller.address);

    expect(e.status).to.equal(0);
  });

  it("Should fail if seller equals buyer", async function () {
    const deadline =
      (await ethers.provider.getBlock("latest")).timestamp + 86400;

    await expect(
      escrow.connect(buyer).createEscrow(
        buyer.address,

        ethers.ZeroAddress,

        ONE_ETH,

        deadline,
      ),
    ).to.be.revertedWith("Buyer cannot be seller");
  });

  it("Should fail if amount too small", async function () {
    const deadline =
      (await ethers.provider.getBlock("latest")).timestamp + 86400;

    await expect(
      escrow.connect(buyer).createEscrow(
        seller.address,

        ethers.ZeroAddress,

        0,

        deadline,
      ),
    ).to.be.reverted;
  });

  /* ===========================================
                CANCEL ESCROW
    =========================================== */

  it("Buyer can cancel escrow", async function () {
    const deadline =
      (await ethers.provider.getBlock("latest")).timestamp + 86400;

    await escrow.connect(buyer).createEscrow(
      seller.address,

      ethers.ZeroAddress,

      ONE_ETH,

      deadline,
    );

    await escrow.connect(buyer).cancelEscrow(1);

    const e = await escrow.getEscrow(1);

    expect(e.status).to.equal(5);
  });

  it("Other account cannot cancel escrow", async function () {
    const deadline =
      (await ethers.provider.getBlock("latest")).timestamp + 86400;

    await escrow.connect(buyer).createEscrow(
      seller.address,

      ethers.ZeroAddress,

      ONE_ETH,

      deadline,
    );

    await expect(escrow.connect(other).cancelEscrow(1)).to.be.revertedWith(
      "Only buyer",
    );
  });

  /* ===========================================
                    FUND
    =========================================== */

  it("Should fund escrow using ETH", async function () {
    const deadline =
      (await ethers.provider.getBlock("latest")).timestamp + 86400;

    await escrow.connect(buyer).createEscrow(
      seller.address,

      ethers.ZeroAddress,

      ONE_ETH,

      deadline,
    );

    await escrow.connect(buyer).fund(
      1,

      {
        value: ONE_ETH,
      },
    );

    const e = await escrow.getEscrow(1);

    expect(e.status).to.equal(1);
  });

  /* ===========================================
                MARK DELIVERED
    =========================================== */

  it("Seller can mark delivered", async function () {
    const deadline =
      (await ethers.provider.getBlock("latest")).timestamp + 86400;

    await escrow
      .connect(buyer)
      .createEscrow(seller.address, ethers.ZeroAddress, ONE_ETH, deadline);

    await escrow.connect(buyer).fund(1, {
      value: ONE_ETH,
    });

    await escrow.connect(seller).markDelivered(1);

    const e = await escrow.getEscrow(1);

    expect(e.status).to.equal(2);
  });

  it("Buyer cannot mark delivered", async function () {
    const deadline =
      (await ethers.provider.getBlock("latest")).timestamp + 86400;

    await escrow
      .connect(buyer)
      .createEscrow(seller.address, ethers.ZeroAddress, ONE_ETH, deadline);

    await escrow.connect(buyer).fund(1, {
      value: ONE_ETH,
    });

    await expect(escrow.connect(buyer).markDelivered(1)).to.be.revertedWith(
      "Only seller",
    );
  });

  /* ===========================================
                CONFIRM RELEASE
    =========================================== */

  it("Buyer can confirm release", async function () {
    const deadline =
      (await ethers.provider.getBlock("latest")).timestamp + 86400;

    await escrow
      .connect(buyer)
      .createEscrow(seller.address, ethers.ZeroAddress, ONE_ETH, deadline);

    await escrow.connect(buyer).fund(1, {
      value: ONE_ETH,
    });

    await escrow.connect(seller).markDelivered(1);

    await escrow.connect(buyer).confirmRelease(1);

    const e = await escrow.getEscrow(1);

    expect(e.status).to.equal(3);
  });

  it("Seller cannot confirm release", async function () {
    const deadline =
      (await ethers.provider.getBlock("latest")).timestamp + 86400;

    await escrow
      .connect(buyer)
      .createEscrow(seller.address, ethers.ZeroAddress, ONE_ETH, deadline);

    await escrow.connect(buyer).fund(1, {
      value: ONE_ETH,
    });

    await escrow.connect(seller).markDelivered(1);

    await expect(escrow.connect(seller).confirmRelease(1)).to.be.revertedWith(
      "Only buyer",
    );
  });

  /* ===========================================
            CLAIM TIMEOUT REFUND
    =========================================== */

  it("Buyer can claim timeout refund", async function () {
    const latest = await ethers.provider.getBlock("latest");

    const deadline = latest.timestamp + 100;

    await escrow
      .connect(buyer)
      .createEscrow(seller.address, ethers.ZeroAddress, ONE_ETH, deadline);

    await escrow.connect(buyer).fund(1, {
      value: ONE_ETH,
    });

    await ethers.provider.send("evm_increaseTime", [101]);

    await ethers.provider.send("evm_mine", []);

    await escrow.connect(buyer).claimTimeoutRefund(1);

    const e = await escrow.getEscrow(1);

    expect(e.status).to.equal(4);
  });

  /* ===========================================
            CLAIM TIMEOUT RELEASE
    =========================================== */

  it("Seller can claim timeout release", async function () {
    const latest = await ethers.provider.getBlock("latest");

    const deadline = latest.timestamp + 86400;

    await escrow
      .connect(buyer)
      .createEscrow(seller.address, ethers.ZeroAddress, ONE_ETH, deadline);

    await escrow.connect(buyer).fund(1, {
      value: ONE_ETH,
    });

    await escrow.connect(seller).markDelivered(1);

    await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60 + 1]);

    await ethers.provider.send("evm_mine", []);

    await escrow.connect(seller).claimTimeoutRelease(1);

    const e = await escrow.getEscrow(1);

    expect(e.status).to.equal(3);
  });

  /* ===========================================
                VIEW FUNCTIONS
    =========================================== */

  it("Should return escrow count", async function () {
    expect(await escrow.getEscrowCount()).to.equal(0);

    const deadline =
      (await ethers.provider.getBlock("latest")).timestamp + 86400;

    await escrow
      .connect(buyer)
      .createEscrow(seller.address, ethers.ZeroAddress, ONE_ETH, deadline);

    expect(await escrow.getEscrowCount()).to.equal(1);
  });

  it("Should return user escrows", async function () {
    const deadline =
      (await ethers.provider.getBlock("latest")).timestamp + 86400;

    await escrow
      .connect(buyer)
      .createEscrow(seller.address, ethers.ZeroAddress, ONE_ETH, deadline);

    const ids = await escrow.getUserEscrows(buyer.address);

    expect(ids.length).to.equal(1);

    expect(ids[0]).to.equal(1);
  });
});
