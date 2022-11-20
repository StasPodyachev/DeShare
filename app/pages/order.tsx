import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../components/Layouts'), {
  ssr: false,
})
const Order = dynamic(() => import('../components/Order'), {
  ssr: false,
})
import { useNetwork } from 'wagmi'

const Home = () => {
  const { chain } = useNetwork()
  return (
    <Layout networkId={chain?.id} title="Sell File">
     <Order/>
    </Layout>
  )
}

export default Home