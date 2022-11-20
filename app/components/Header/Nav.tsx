import { useState } from 'react'
import { Divide as Hamburger } from 'hamburger-react'
import styles from './Nav.module.css'
import Link from 'next/link'

const navigation = [
  { name: 'Market', href: '/', current: true },
  { name: 'Sell File', href: '/order', current: false },
  { name: 'Dashboard', href: '/user', current: false },
  { name: 'FAQ', href: '/faq', current: false }

]

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <div className={styles.burger}>
        <div className={styles.icons}>
          <div className={styles.burgeIcon} onClick={() => setIsOpen(!isOpen)}>
            <Hamburger toggled={isOpen} size={20} color='#fff' />
          </div>
        </div>
      </div>
      {
        isOpen ? 
        <div className={styles.navMobile}>
          <div className={styles.navigation}>
            {
              navigation.map(item => {
                return (
                  <div key={item.name} onClick={() => {
                    const close = () => setIsOpen(false)
                    setTimeout(close, 1000)
                  }} className={styles.link}>
                    <Link href={item?.href}>
                      {item?.name}
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div> : null
      }
    </div>
  )
}

export default Nav