import styles from './Layout.module.css'
import Header from '../Header';

const Layout = ({children, title, networkId} : {children, title: string, networkId: number}) => {
  if (networkId === 420 ||networkId === 80001 ) {
    return (
      <div className={styles.layout}>
        <Header />
        <div className={styles.main}>
          {children}
        </div>
      </div>
      
    )
  }
  else {
    return (
      <div className={styles.layout}>
        <Header/>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    )
  }

}

export default Layout