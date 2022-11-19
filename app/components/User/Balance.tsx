import { useBalance } from 'wagmi'
import styles from './user.module.css'

const Balance = ({address}) => {
 const { data, isError, isLoading } = useBalance({
  address,
  watch: true
 })

 if (isLoading) return <div>Fetching balance…</div>
 if (isError) return <div>Error fetching balance</div>

 return (
  <div className={styles.balance}>
   {(+data?.formatted).toFixed(2)} {data?.symbol}
  </div>
 )
}

export default Balance