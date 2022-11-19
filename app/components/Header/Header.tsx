import styles from './Header.module.css'
import Logo from './Logo'
import Nav from './Nav'
import { ConnectBtn } from '../ConnectBtn/ConnectBtn';

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