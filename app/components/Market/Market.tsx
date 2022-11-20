
import ListMarket from './ListMarket/ListMarket'
import styles from './Market.module.css'

import { erc20ABI, useAccount, useContract, useContractRead, useSigner } from 'wagmi'
import addresses from '../../contracts/addresses'
import DESHARE_ABI from '../../contracts/abi/DeShare.json'
import { useEffect, useState } from 'react'
import { approved } from './utils'

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
  const {address} = useAccount()
  const { data: signer } = useSigner()
  const [ isApprove, isSetApprove ] = useState(false)

  const contractERC20USDC = useContract({
    address: addresses.USDC,
    abi: erc20ABI,
    signerOrProvider: signer
  })

  useEffect(() => {
    if (address && signer && contractERC20USDC) {
      approved(contractERC20USDC, address, addresses.deshare).then((res) => {
        console.log(res, 'res');
        isSetApprove(res)
      })
    }
  }, [address, signer, contractERC20USDC])

  return (
    <div className={styles.main}>
      <p className={styles.title}>
        <span>DeShare is fully decentralized file trading platform.</span> You can easily buy or sell file of any type here.
      </p>
      <MarketList setMarkets={setMarkets} />
      <ListMarket isSetApprove={isSetApprove} isApprove={isApprove} />
    </div>
  )
}

export default Market