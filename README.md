# DeShare V1

[![Lint]TBD
[![Tests]TBD
[![Fuzz Testing]TBD
[![Mythx]TBD

This repository contains smart contracts and developer tools for DeShare V1 protocol which powers [https://deshare.vercel.app/]

## What is DeShare?

DeShare V1 is a fully decentralized file trading platform. Users can buy and sell any files using Filecoin and IPFS.

In times of increasing censorship from the authorities and large corporations, it is necessary to have an environment where freedom of speech and expression are the key values. So far as Filecoin is a decentralized storage network designed to store humanity’s most important information, no one has to restrict information sharing inside the network.

During Hack FEVM our team decided to work on MVP of an anonymous uncensored content trading platform managed by DAO.
There are three roles on the platform: content Seller, content Buyer and Arbitrator.
Users authorize with Metamask.
The content Seller can upload the file to the vault in IPFS. The vault key is stored in a smart contract (actor). The Seller selects a category, adds a description and a sample if necessary. Also, the Seller can limit the storage period for the file, after which it is automatically deleted.
The Buyer can find files by category and description, view samples and make purchases at the platform.

Next upgrades to be done after the hackathon.
The Seller can set exclusive or multiple sale.
Significant files may be sold with Arbitrators’ escrow.
Arbitrator is a DAO participant, who owns a certain number of DeShare DAO tokens and can be chosen by the Seller as a escrow agent confirming quality of the file and guarantying payment. In that case the Arbitrator receives fee. Once the Buyer has paid, the funds will not be released to the Seller until the Buyer or Arbitrator signs the second transaction. The Buyer can apply to the Arbitrator with a request to return the money back if the file does not match the description or samples.

The web interface code is stored on IPFS so anyone can deploy it at any time and check that the site interacts with the original smart contracts.
Content Sellers will pay 10% of the content price to the DAO treasure. DAO structure and tokenomics will be a subject of further work.

## Documentation

#### Whitepaper: in progress

For more comprehensive information about DeShare V1 you can read our whitepaper and project description on our [Notion Documentation](https://godefx.notion.site/godefx/DeShare-Public-Documentation-Hackathon-FEVM-2976e0e5441f49c7bd843e85dd113a32).

#### Technical Documentation

Check our full Documentation [here](https://godefx.notion.site/godefx/DeShare-Public-Documentation-Hackathon-FEVM-2976e0e5441f49c7bd843e85dd113a32) for more technical details.

## Smart contracts

Copy .env.example to .env and define all variables.

`yarn`

or

`npm install`

### Deploy & configure

```
yarn compile
npx hardhat deploy:all --network <network>
npx hardhat configure:all --network <network>
```

**network** - the following networks are supported in this code: `optimism-kovan`, `mumbai`

### Verify

```
npx hardhat run scripts/verify.ts --network <network>
```

### Deploy

```
yarn prepare:<network>
yarn codegen
yarn deploy:<network>
```

**network** - the following networks are supported in this code: `wallaby`

## Frontend

`yarn start`
or
`npm run start`

## Testing

yarn test

## Contracts

You can find current contract addresses at deployed.json file.

## Security

#### Independent Audits

All production smart contracts will be going through independent audit.

#### Code Coverage

in progress

## Community.

Join our community at discord.
https://discord.gg/M9upgNwR

## Licensing

...

### Other Exceptions
