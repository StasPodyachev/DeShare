
import ListMarket from './ListMarket/ListMarket'
import styles from './Market.module.css'
const Market = () => {
  return (
    <div className={styles.main}>
      <p className={styles.title}>
        <span>DeShare is fully decentralized file trading platform.</span> You can easily buy or sell file of any type here.
      </p>
      <ListMarket />
    </div>
  )
}

export default Market