import { ethers, waffle } from "hardhat"
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
    it("publush item and get list", async () => {
      await deShare.publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        { value: 1 }
      )


      const items = await deShare.getAllSellerItems();
      const id = await deShare.lastId();

      expect(id.toString()).to.be.eq(items[0].id.toString());
    })

    it("fails if msg.value is 0", async () => {
      await expect(
        deShare.publishItem(
          "0x",
          100000,
          180,
          [10, 10],
          [USDC, USDT],
          "Test Name"
        )
      ).to.be.revertedWith("DeShare: msg.value cannot be 0")
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
          { value: 1 }
        )
      ).to.be.revertedWith("DeShare: Incorrect input data")
    })
  })

  describe("#buyItem", () => {
    it("success case", async () => {

      await deShare.connect(other).publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        { value: 1 }
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

    it("fails if item is deleted", async () => {
      await deShare.publishItem(
        "0x",
        100000,
        180,
        [10, 10],
        [USDC, USDT],
        "Test Name",
        { value: 1 }
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
        { value: 1 }
      )

      const id = await deShare.lastId();

      await deShare.freezeItem(id, true)

      await expect(
        deShare.buyItem(id, USDC, 10, "0x")
      ).to.be.revertedWith("DeShare: Item is freezed")
    })
  })
})
