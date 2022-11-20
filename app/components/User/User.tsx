import { useAccount } from 'wagmi'
import dynamic from 'next/dynamic'
const Balance = dynamic(() => import('./Balance'), {
  ssr: false,
})
import ItemMarket from './ItemMarket/ItemMarket'
import styles from './user.module.css'
import { useState } from 'react'

const markets = [
 {
   id: 1,
   title: "Dataset Swaps FRAX/USDC",
   description: "All swaps on Uniswap V3 pool with 100 fee",
   price: "20.50 USDT",
   size: "26.2 Mb",
   icon: "/dataset.svg",
   categories: "Dataset"
 },
 {
   id: 3,
   title: "Photoset Doge in New York",
   description: "Exlusive Photos in Urban space. 24 items(1024x1928). Free to use under the Unsplash License",
   price: "128.40 USDT",
   size: "126.2 Mb",
   icon: "/photo.svg",
   categories: "Photo"
 },
 {
   id: 13,
   title: "Exlusive Rihana repeticion vocal.",
   description: "Backstage from San Francisco Music hall",
   price: "15 USDT",
   size: "26.2 Mb",
   icon: "/music.svg",
   categories: "Music"
 }
]

const filters = [
  {
    title: "All",
  },
  {
    title: "Dataset",
  },
  // {
  //   title: "Video",
  // },
  {
    title: "Photo",
  },
  {
    title: "Music",
  }
]

const User = () => {
 const {address} = useAccount()
 const [ filterStore, setFilterStore ] = useState<string>(filters[0].title)
 const [ filterPur, setFilterPur ] = useState<string>(filters[0].title)

 const storeList = filterStore !== "All" ?
  markets?.filter(order => filterStore === order.categories) : markets

 const storePurhase = filterPur !== "All" ?
 markets?.filter(order => filterPur === order.categories) : markets

return (
  <div className={styles.user}>
   <div className={styles.block}>
    <div className={styles.balances}>
     <h2>Info</h2>
     <span>Balance: <Balance address={address}/></span>
     <span>Profit:  <p>3010 USDT</p></span>
     <span>My Sales: <p>3</p></span>
    </div>
   </div>
    <div className={styles.nav}>
      <div className={styles.title}>My Store</div>
      <div className={styles.list}>
        {
          filters?.map(item => <div
            className={filterStore === item.title ? styles.active : styles.default}
            onClick={() => setFilterStore(item.title)}
            key={item.title}>{item?.title}</div>)
        }
      </div>
    </div>
    {storeList.map(order => <ItemMarket key={order.icon} order={order} type="order"/>)}
    <div className={styles.nav}>
      <div className={styles.title}>My Purchases</div>
      <div className={styles.list}>
        {
          filters?.map(item => <div
            className={filterPur === item.title ? styles.active : styles.default}
            onClick={() => setFilterPur(item.title)}
            key={item.title}>{item?.title}</div>)
        }
      </div>
    </div>
    {
      storePurhase.map(order => {
       return (
        <ItemMarket key={order.icon} order={order} type="order" />
       )
      })
     }

  </div>
 )
}
export default User