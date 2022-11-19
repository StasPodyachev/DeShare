import styles from './Header.module.css'
import Logo from './Logo'
import Nav from './Nav'
import dynamic from 'next/dynamic'
const ConnectBtn = dynamic(() => import('../ConnectBtn'), {
  ssr: false,
})

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
        <ConnectBtn/>
      <Nav/>
    </header>
  )
}

export default Header