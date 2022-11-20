import { ethers, waffle, network } from "hardhat"
import { BigNumber, constants, ContractFactory, Wallet } from "ethers"
import { Factory } from "../typechain/Factory"
import { expect } from "chai"
import { deShareFixture } from "./shared/fixtures"
import { DeShare } from "../typechain/DeShare"

const createFixtureLoader = waffle.createFixtureLoader


describe("DeShare", () => {
  let wallet: Wallet, other: Wallet
  let factory: Factory
  let deShare: DeShare

  const USDC = "0xae3a768f9ab104c69a7cd6041fe16ffa235d1810";
  const USDT = "0xae3a768f9ab104c69a7cd6041fe16ffa235d1810";


  let loadFixture: ReturnType<typeof createFixtureLoader>

  before("create fixture loader", async () => {
    ;[wallet, other] = await (ethers as any).getSigners()
    loadFixture = createFixtureLoader([wallet, other])
  })

  beforeEach("deploy fixture", async () => {
    ; ({ factory, deShare } = await loadFixture(
      deShareFixture
    ))
  })

  describe("#publishItem", () => {
    it("publish item and get list", async () => {
      await deShare.publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )


      const items = await deShare.getAllSellerItems();
      const id = await deShare.lastId();

      expect(id.toString()).to.be.eq(items[0].id.toString());
    })

    it("fails if msg.value is incorrect", async () => {
      await expect(
        deShare.publishItem(
          "0x",
          100000,
          180,
          [10, 10],
          [USDC, USDT],
          "t01113",
          "Test Name"
        )
      ).to.be.revertedWith("DeShare: msg.value is incorrect")
    })

    it("fails if input data is incorrect", async () => {
      await expect(
        deShare.publishItem(
          "0x",
          100000,
          180,
          [10, 10, 10, 10],
          [USDC, USDT],
          "Test Name",
          "t01113",
          { value: 6600000000000 }
        )
      ).to.be.revertedWith("DeShare: Incorrect input data")
    })
  })

  describe("#buyItem", () => {
    it("buy item and get list", async () => {
      await deShare.connect(other).publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      const id = await deShare.lastId();

      await deShare.buyItem(id, USDC, 10, "0x")

      const items = await deShare.getAllBuyerItems();
      expect(id.toString()).to.be.eq(items[0].id.toString());
    })

    it("fails if the price is incorrect", async () => {
      await expect(
        deShare.buyItem(1, USDC, 10000, "0x")
      ).to.be.revertedWith("DeShare: Wrong Id")
    })

    it("fails if item does not exist", async () => {
      await expect(
        deShare.buyItem(1, USDC, 10, "0x")
      ).to.be.revertedWith("DeShare: Wrong Id")
    })

    it("fails if deal expired", async () => {
      await deShare.publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      const id = await deShare.lastId();

      await network.provider.send("evm_increaseTime", [200]);
      await network.provider.request({ method: "evm_mine", params: [] });

      await expect(
        deShare.buyItem(id, USDC, 10, "0x")
      ).to.be.revertedWith("DeShare: Deal expired")
    })

    it("fails if item is deleted", async () => {
      await deShare.publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      const id = await deShare.lastId();

      await deShare.deleteItem(id)

      await expect(
        deShare.buyItem(id, USDC, 10, "0x")
      ).to.be.revertedWith("DeShare: Wrong Id")
    })

    it("fails if item is freezed", async () => {
      await deShare.publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      const id = await deShare.lastId();

      await deShare.freezeItem(id, true)

      await expect(
        deShare.buyItem(id, USDC, 10, "0x")
      ).to.be.revertedWith("DeShare: Item is freezed")
    })
  })


  describe("#deleteItem", () => {
    it("try to buy item after deleting", async () => {
      await deShare.publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      const id = await deShare.lastId();
      const item = await deShare.getItem(id)

      await deShare.deleteItem(id);

      await expect(
        deShare.buyItem(id, USDC, 10, "0x")
      ).to.be.revertedWith("DeShare: Wrong Id")
    })

    it("fails if item does not exsit", async () => {
      await expect(
        deShare.deleteItem(1)
      ).to.be.revertedWith("DeShare: Wrong Id")
    })

    it("fails if caller does not own the item", async () => {
      await deShare.connect(other).publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      const id = await deShare.lastId();

      await expect(
        deShare.deleteItem(id)
      ).to.be.revertedWith("DeShare: Caller does not own the item")

      const item = await deShare.getItem(id);
      expect(item.isDeleted).to.be.eq(false);
    })
  })

  describe("#freezeItem", () => {
    it("try to buy after freeze", async () => {
      await deShare.publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      const id = await deShare.lastId();

      await deShare.freezeItem(id, true);
      let item = await deShare.getItem(id);

      expect(item.isFreezed).to.be.eq(true);

      await expect(
        deShare.buyItem(id, USDC, 10, "0x")
      ).to.be.revertedWith("DeShare: Item is freezed")

      await deShare.freezeItem(id, false);
      item = await deShare.getItem(id);

      expect(item.isFreezed).to.be.eq(false);

      await expect(
        deShare.buyItem(id, USDC, 10, "0x")
      ).to.be.not.reverted;
    })

    it("fails if item does not exsit", async () => {
      await expect(
        deShare.freezeItem(1, true)
      ).to.be.revertedWith("DeShare: Wrong Id")
    })

    it("fails if caller does not own the item", async () => {
      await deShare.connect(other).publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      const id = await deShare.lastId();

      await expect(
        deShare.freezeItem(id, true)
      ).to.be.revertedWith("DeShare: Caller does not own the item")

      const item = await deShare.getItem(id);
      expect(item.isFreezed).to.be.eq(false);
    })
  })

  describe("#getUri", () => {
    it("try to get uri", async () => {
      await deShare.publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      const id = await deShare.lastId();

      expect(deShare.getUri(id, "0x")).to.be.not.reverted;
    })

    it("fails if uri does not exsit", async () => {
      await expect(
        deShare.getUri(1, "0x")
      ).to.be.revertedWith("DeShare: Wrong Id")
    })

    it("fails if access is forbidden", async () => {
      await deShare.connect(other).publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      const id = await deShare.lastId();

      await expect(
        deShare.getUri(id, "0x")
      ).to.be.revertedWith("DeShare: ACCESS_FORBIDDEN")
    })

  })

  describe("#getAllItems", () => {
    it("try to get all items", async () => {
      let items = await deShare.getAllItems();
      expect(0).to.be.eq(items.length);

      await deShare.connect(other).publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      items = await deShare.getAllItems();
      expect(1).to.be.eq(items.length);

      await deShare.publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      items = await deShare.getAllItems();
      expect(2).to.be.eq(items.length);

      const id = await deShare.lastId();
      await deShare.buyItem(id, USDC, 10, "0x");

      items = await deShare.getAllItems();
      expect(2).to.be.eq(items.length);
    })
  })

  describe("#getAllSellerItems", () => {
    it("try to get all seller items", async () => {
      let items = await deShare.getAllSellerItems();
      expect(0).to.be.eq(items.length);

      await deShare.connect(other).publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      items = await deShare.getAllSellerItems();
      expect(0).to.be.eq(items.length);

      await deShare.publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      items = await deShare.getAllSellerItems();
      expect(1).to.be.eq(items.length);

      const id = await deShare.lastId();
      await deShare.buyItem(id, USDC, 10, "0x");

      items = await deShare.getAllSellerItems();
      expect(1).to.be.eq(items.length);
    })
  })

  describe("#getAllBuyerItems", () => {
    it("try to get all seller items", async () => {
      let items = await deShare.getAllBuyerItems();
      expect(0).to.be.eq(items.length);

      await deShare.connect(other).publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      items = await deShare.getAllBuyerItems();
      expect(0).to.be.eq(items.length);

      await deShare.publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        "t01113",
        { value: 6600000000000 }
      )

      items = await deShare.getAllBuyerItems();
      expect(0).to.be.eq(items.length);

      const id = await deShare.lastId();
      await deShare.buyItem(id, USDC, 10, "0x");

      items = await deShare.getAllBuyerItems();
      expect(1).to.be.eq(items.length);
    })
  })
})
