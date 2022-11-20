import { useEffect } from "react"
import { useAccount, useBalance } from "wagmi"
import addresses from "../../contracts/addresses"

async function postData(data) {
 if (!data?.wallet || data?.wallet == '') return
   fetch('/api/faucet', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       wallet: data?.wallet,
       token: data?.token,
       chainId: data?.chainId
     }),
   }).catch((err) => {})
}
const LayoutFaucet = ({networkId, children}) => {
  const { address } = useAccount()
  const {data: usdc } = useBalance({
    address,
    token: addresses.USDC
  })
  
  useEffect(() => {
    if (address && usdc) {
      if (+usdc?.formatted[0] < 1000 && address) {
        postData({
          wallet: address,
          token: addresses.USDC,
          chainId: networkId
        })
      }
    }
  }, [address, usdc])

 return children
}

export default LayoutFaucet