import Layout from '../components/Layouts'
import { useNetwork } from 'wagmi'
import User from '../components/User'

const Home = () => {
  const { chain } = useNetwork()
  return (
    <Layout networkId={chain?.id} title="Account">
     <User/>
    </Layout>
  )
}

export default Home