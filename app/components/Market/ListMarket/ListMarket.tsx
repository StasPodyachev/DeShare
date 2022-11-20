import { useRouter } from 'next/router'
import Button from '../../ui/Button'
import ItemMarket from '../ItemMarket/ItemMarket'
import styles from './ListMarket.module.css'

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

const ListMarket = () => {
  const {push} = useRouter()
  return (
    <div className={styles.listMarket}>
      {
        markets?.map(order => {
          return <ItemMarket order={order} key={order.id}/>
        })
      }
      <div className={styles.btn}>
        <Button onClick={() => push("/order")} title='+ Sell'/>
      </div>
    </div>
  )
}

export default ListMarket