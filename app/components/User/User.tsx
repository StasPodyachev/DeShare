import { useAccount } from 'wagmi'
import dynamic from 'next/dynamic'
const Balance = dynamic(() => import('./Balance'), {
  ssr: false,
})
import ItemMarket from './ItemMarket/ItemMarket'
import styles from './user.module.css'

const markets = [
 {
   id: 1,
   title: "Image Portfolio",
   description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse amet eum dolore sunt itaque harum consectetur. Veniam, asperiores fuga iusto corporis corrupti tempore cumque non obcaecati molestias magnam veritatis laboriosam itaque rerum laudantium fugiat provident praesentium vitae aperiam!",
   price: "220.50 USDT",
   size: "26.2 Mb",
   icon: "/icons/iconsCurrency/1inch.svg"
 },
 {
   id: 3,
   title: "Photos",
   description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, ipsa! Placeat quas explicabo dolores in qui.",
   price: "128.40 USDT",
   size: "126.2 Mb",
   icon: "/icons/iconsCurrency/Coinbase.svg"
 },
 {
   id: 13,
   title: "Icons",
   description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum totam ut, ipsa a explicabo, autem sed suscipit necessitatibus adipisci similique saepe dolor inventore!",
   price: "220.50 USDT",
   size: "26.2 Mb",
   icon: "/icons/iconsCurrency/AVAX.svg"
 }
]

const User = () => {

 const {address} = useAccount()

 return (
  <div className={styles.user}>
   <div className={styles.block}>
    <div className={styles.balances}>
     <h2>Account Info</h2>
     <span>Balance: <Balance address={address}/></span>
     <span>Profit:  <p>3010 USDT</p></span>
     <span>Sales count/amount: <p>3</p></span>
    </div>
   </div>


     <div className={styles.title}>My Store</div>
     {
      markets.map(order => {
       return (
        <ItemMarket key={order.icon} order={order} />
       )
      })
     }

   
    <div className={styles.title}>My Purchases</div>
    {
      markets.map(order => {
       return (
        <ItemMarket key={order.icon} order={order} />
       )
      })
     }

  </div>
 )
}
export default User