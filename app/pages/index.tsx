import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../components/Layouts'), {
  ssr: false,
})
const Market = dynamic(() => import('../components/Market'), {
  ssr: false,
})
import { useNetwork } from 'wagmi'
const Home = () => {

  const { chain } = useNetwork()

  return (
    <Layout networkId={chain?.id} title="Market">
      <Market/>
    </Layout>
  )
}

export default Home