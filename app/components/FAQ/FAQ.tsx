import Link from 'next/link';
import styles from './faq.module.css';
const FAQ = () => {
  return (
    <div className={styles.faq}>
      <div className={styles.block}>
        <h2>What is DeShare?</h2>
        <p>DeShare is fully decentralized file trading platform. You can easily buy or sell file of any type here. The project is in Alpha version so developers use the wallaby testnet.</p>
        <Link className={styles.link} href="https://www.notion.so/godefx/DeShares-Public-Documentation-Hackathon-FEVM-2976e0e5441f49c7bd843e85dd113a32">
          Learn about DeShare →
        </Link>
      </div>

      <div className={styles.block}>
        <h2>How can I sell my file?</h2>
        <p>To sell your file go to <Link href="/order" style={{"color" : "#54e390"}}>Sell file page</Link>. Authorize with your Metamask and upload your file. Then add description, duration of file sale and set the price. Confirm transaction in Metamask to pay for your file storage. You have to have FIL tokens at your balance to pay for file storage.</p>
      </div>

      <div className={styles.block}>
        <h2>How can I buy a file?</h2>
        <p>To buy the file you choose here <Link href="/" style={{"color" : "#54e390"}}>Market page</Link>, you have to authorize with your Metamask</p>
      </div>

      <div className={styles.block}>
        <h2>What is Filecoin?</h2>
        <p>Filecoin is a peer-to-peer network that allows anyone to store and retrieve data on the internet. Built-in economic incentives ensure that files are stored and retrieved reliably and continuously for however long a user specifies. Filecoin network uses native token FIL. Wallaby testnet uses TFIL.</p>
        <Link className={styles.link} href="https://docs.filecoin.io/about-filecoin/what-is-filecoin/">
          Learn about Filecoin →
        </Link>
      </div>

      <div className={styles.block}>
        <h2>What is Wallaby testnet?</h2>
        <p>The Wallaby testnet is a Filecoin testnet dedicated to wasm testing.</p>
        <Link className={styles.link} href="https://kb.factor8.io/en/docs/fil/wallabynet">
          Learn more →
        </Link>
      </div>

      <div className={styles.block}>
        <h2>How can I operate in Wallaby testnet with Metamask?</h2>
        <p>To add Wallaby Testnet to Metamask go to chainlist.org and type wallaby to searchbar, make sure Testnet tumbler in your Metamask is switched on. Connect your wallet and after that press ‘Add to Metamask’ button.</p>
      </div>

      <div className={styles.block}>
        <h2>Where can I get testnet FIL (TFIL) to pay for file upload to IPFS?</h2>
        <p>To get tokens use Wallaby faucet. But first we need to get our Filecoin-specific address associated with our ethereum address. To do that, go to <Link style={{"color" : "#54e390"}} href="https://explorer.glif.io/ethereum/?network=wallabynet">https://explorer.glif.io/ethereum/?network=wallabynet </Link>
        Then copy your ethereum public address from Metamask to which you want faucet to send test tokens and paste into convertation form: "t" prefix means that this is testnet address.
        Then visit <Link style={{"color" : "#54e390"}} href="https://wallaby.network/#faucet">https://wallaby.network/#faucet </Link> and paste your Fil address to get some TFIL tokens. It will take around a minute for your test funds be displayed on Metamask.</p>
      </div>
    </div>
  )
} 

export default FAQ