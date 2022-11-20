import { Factory } from '../../typechain/Factory'
import { ethers } from 'hardhat'
import { DeShare } from '../../typechain/DeShare'
import { MarketAPI } from '../../typechain/MarketAPI'

interface FactoryFixture {
  factory: Factory
}

export async function factoryFixture(): Promise<FactoryFixture> {
  const factoryFactory = await ethers.getContractFactory('Factory')
  const factory = (await factoryFactory.deploy()) as Factory
  return { factory }
}

interface DeShareFixture {
  deShare: DeShare,
  factory: Factory
}

export async function deShareFixture(): Promise<DeShareFixture> {
  const { factory } = await factoryFixture()

  const deShareFactory = await ethers.getContractFactory('DeShare')
  const deShare = (await deShareFactory.deploy()) as DeShare

  const marketApiFactory = await ethers.getContractFactory('MarketAPI')
  const marketApi = (await marketApiFactory.deploy()) as MarketAPI

  await marketApi.mock_add_deals([
    {
      id: 0,
      cid: "baga6ea4seaqlkg6mss5qs56jqtajg5ycrhpkj2b66cgdkukf2qjmmzz6ayksuci",
      size: 8388608,
      verified: false,
      client: "t01109",
      provider: "t01113",
      label: "mAXCg5AIg8YBXbFjtdBy1iZjpDYAwRSt0elGLF5GvTqulEii1VcM",
      start: 25245,
      end: 545150,
      price_per_epoch: 1100000000000,
      provider_collateral: 0,
      client_collateral: 0,
      activated: 1,
      terminated: 0,
    },
  ])

  await deShare.setFactory(factory.address)
  await deShare.setMarketApi(marketApi.address)

  return {
    deShare,
    factory
  }
}
