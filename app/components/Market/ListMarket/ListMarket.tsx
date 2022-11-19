import Button from '../../ui/Button'
import ItemMarket from '../ItemMarket/ItemMarket'
import styles from './ListMarket.module.css'

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

const ListMarket = () => {
  return (
    <div className={styles.listMarket}>
      {
        markets?.map(order => {
          return <ItemMarket order={order} key={order.id}/>
        })
      }
      <div className={styles.btn}>
        <Button onClick={() => console.log("+ Sell")} title='+ Sell'/>
      </div>
    </div>
  )
}

export default ListMarket