import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../components/Layouts'), {
  ssr: false,
})
const FAQ = dynamic(() => import('../components/FAQ'), {
  ssr: false,
})
import { useNetwork } from 'wagmi'
const Home = () => {
  const { chain } = useNetwork()
  return (
    <Layout networkId={chain?.id} title="FAQ">
      <FAQ/>
    </Layout>
  )
}

export default Home