import Layout from '../components/Layouts'
import Market from '../components/Market'
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