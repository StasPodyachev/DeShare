import { useAccount } from 'wagmi'
import Balance from './Balance'
import styles from './user.module.css'
const User = () => {

 const {address} = useAccount()

 return (
  <div className={styles.user}>
   <div className={styles.block}>
    <div className={styles.balances}>
     <h2>Account Info</h2>
     <span>Balance: <Balance address={address} /></span>
     <span>Profit: </span>
     <span>Sales count/amount: </span>
    </div>
   </div>

  </div>
 )
}
export default User