import { Factory } from '../../typechain/Factory'
import { ethers } from 'hardhat'
import { DeShare } from '../../typechain/DeShare'

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

  await deShare.setFactory(factory.address)

  return {
    deShare,
    factory
  }
}
