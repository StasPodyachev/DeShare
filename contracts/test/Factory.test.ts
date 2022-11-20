import { ethers, waffle } from "hardhat"
import { constants, Wallet } from "ethers"
import { Factory } from "../typechain/Factory"
import { expect } from "chai"
import { factoryFixture } from "./shared/fixtures"

const createFixtureLoader = waffle.createFixtureLoader

describe("Factory", () => {
  let wallet: Wallet, other: Wallet

  let factory: Factory

  let loadFixture: ReturnType<typeof createFixtureLoader>

  before("create fixture loader", async () => {
    ;[wallet, other] = await (ethers as any).getSigners()
    loadFixture = createFixtureLoader([wallet, other])
  })

  beforeEach("deploy fixture", async () => {
    ; ({ factory } = await loadFixture(
      factoryFixture
    ))
  })


  describe("#setOwner", () => {
    it("success changed", async () => {
      let owner = await factory.owner()

      await factory.setOwner(other.address)

      owner = await factory.owner()

      expect(other.address).to.be.eq(owner)
    })

    it("fail if caller not owner", async () => {
      await expect(factory.connect(other).setOwner(wallet.address)).to.be
        .reverted
    })
  })
})
