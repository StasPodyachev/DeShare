import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <Image src="/images/logo-dark.svg" width={60} height={60} alt="logo Cfd" />
      </Link>
    </div>
  )
}

export default Logo