
import ListMarket from './ListMarket/ListMarket'
import styles from './Market.module.css'

import { useBalance, useContractRead } from 'wagmi'
import addresses from '../../contracts/addresses'
import DESHARE_ABI from '../../contracts/abi/DeShare.json'
import { useEffect, useState } from 'react'

const MarketList = ({setMarkets}) => {
  const { data, isError, isLoading } = useContractRead({
    address: addresses.deshare,
    abi: DESHARE_ABI,
    functionName: 'getAllItems',
  })

  useEffect(() => {
    if (data) {
      console.log(data, 'data');
      setMarkets(data)
    }
  }, [data])

 if (isLoading) return <div>Fetching balance…</div>
 if (isError) return <div>Error fetching balance</div>

 return (
  <div className={styles.balance}/>
 )
}

const Market = () => {
  const [ markets, setMarkets ] = useState([])
  useEffect(() => {
    console.log(markets, 'markets');
  }, [markets])
  return (
    <div className={styles.main}>
      <p className={styles.title}>
        <span>DeShare is fully decentralized file trading platform.</span> You can easily buy or sell file of any type here.
      </p>
      <MarketList setMarkets={setMarkets} />
      <ListMarket />
    </div>
  )
}

export default Market