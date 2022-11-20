const hre = require("hardhat")
import { deployNames } from "./constants"
import deployment from "../deployment/deployments.json"
import { DeShare, Factory, MarketAPI } from "../typechain"
import { writeDeployData } from "./utils"
const deployments: IDeployment = deployment

let NETWORK: string

const items = [
  {
    id: 67,
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
  {
    id: 68,
    cid: "baga6ea4seaqiun7s6npsi23ujt55qclad2rkxy44hx5thrmllgdl5pbcv32gsky",
    size: 4194304,
    verified: false,
    client: "t01109",
    provider: "t01113",
    label: "mAXCg5AIg4KyGboe+GUQSZFtHmtUnk2IcXbaRFl4V1YOmC9vgoms",
    start: 25249,
    end: 545150,
    price_per_epoch: 1700000000000,
    provider_collateral: 0,
    client_collateral: 0,
    activated: 1,
    terminated: 0,
  },
  {
    id: 69,
    cid: "baga6ea4seaqftmfuagbtycvrcskaol64eyio3dnzpjbllpwvwkv2nd5lqdiymby",
    size: 8388608,
    verified: false,
    client: "t01109",
    provider: "t01113",
    label: "mAXCg5AIgxXsZaQ0qnC01BIARoPmPYa/qOOoI5se/a+R5PfUTV2g",
    start: 25246,
    end: 545150,
    price_per_epoch: 1200000000000,
    provider_collateral: 0,
    client_collateral: 0,
    activated: 1,
    terminated: 0,
  },
  {
    id: 70,
    cid: "baga6ea4seaqastxji7jl5lgnnkcrqrmacaghmxjsgif6dose77ggmn2dkwpnqoq",
    size: 8388608,
    verified: false,
    client: "t01109",
    provider: "t01113",
    label: "mAXCg5AIgn6xPVzAVUsugSuUtyJkSdzakFc17R5LxQ0+ql2RpTpI",
    start: 25246,
    end: 545150,
    price_per_epoch: 1300000000000,
    provider_collateral: 0,
    client_collateral: 0,
    activated: 1,
    terminated: 0,
  },
  {
    id: 71,
    cid: "baga6ea4seaqn7y7fwlhlshrysd2j443pyi6knof2c5qp533co2mqj5rzbq7t2pi",
    size: 8388608,
    verified: false,
    client: "t01109",
    provider: "t01113",
    label: "mAXCg5AIgw4oywPmiPRxJLioYxMdIkKmaJ4FFumCvS/GC4gEzGng",
    start: 25247,
    end: 545150,
    price_per_epoch: 1400000000000,
    provider_collateral: 0,
    client_collateral: 0,
    activated: 1,
    terminated: 0,
  }
]

const contracts: any = [
  // {
  //   name: "factory",
  //   contractName: "Factory",
  //   f: factory,
  // },
  // {
  //   name: "deshare",
  //   contractName: "DeShare",
  //   f: deShare,
  // },
  {
    name: "marketApi",
    contractName: "MarketAPI",
    f: marketApi,
  },
]

async function main() {
  NETWORK = await hre.getChainId()
  for (let i in contracts) {
    const contract = contracts[i]

    if (contract.networks && !contract.networks[NETWORK]) continue

    console.log(`configuring ${contract.contractName} started`)

    await contract.f()

    console.log(`${contract.contractName} configured success`)
    console.log("-------------------------------------------")
  }
}

async function factory() {
  const factoryDeployed = deployments[NETWORK].Factory

  const factory = (await hre.ethers.getContractAt(
    "Factory",
    factoryDeployed.address
  )) as Factory
}

async function deShare() {
  const deforexDeployed = deployments[NETWORK][deployNames.DEFOREX]
  const factoryDeployed = deployments[NETWORK][deployNames.FACTORY]

  const deShare = (await hre.ethers.getContractAt(
    "Deforex",
    deforexDeployed.address
  )) as DeShare

  await deShare.setFactory(factoryDeployed.address)
}

async function marketApi() {
  const marketDeployed = deployments[NETWORK][deployNames.MARKET_API]
  const marker = (await hre.ethers.getContractAt(
    "MarketAPI",
    marketDeployed.address
  )) as MarketAPI

  await marker.mock_add_deals(items)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
