
import { DownloadIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import Button from '../../ui/Button'
import styles from './ItemMarket.module.css'
interface OrderModel {
  id: number
  title: string
  description: string
  price: string
  size: string
  icon: string
}

const ItemMarket = ({order, type} : {order: OrderModel, type: string}) => {
  return (
    <div className={styles.itemMarket}>
      <div className={styles.header}>
        <Image src={order?.icon} width={40} height={40} alt="icon"/>
        <span className={styles.title}>{order?.title}</span>
        <span className={styles.price}>{order?.price}</span>
      </div>
      <span className={styles.description}>{order?.description}</span>
      <div className={styles.options}>
        <DownloadIcon />
        <span>Size files {order?.size}</span>
      </div>
    </div>
  )
}

export default ItemMarket