import styles from './Layout.module.css'
import Header from '../Header';
import LayoutFaucet from './Faucet';

const Layout = ({children, title, networkId} : {children, title: string, networkId: number}) => {
  if (networkId ) {
    return (
      <LayoutFaucet networkId={networkId}>
        <div className={styles.layout}>
          <Header />
          <div className={styles.main}>
            <h1>{title}</h1>
            {children}
          </div>
        </div>
      </LayoutFaucet>
      
    )
  }
  else {
    return (
      <div className={styles.layout}>
        <Header/>
        <div className={styles.main}>
          <h1>{title}</h1>
          {children}
        </div>
      </div>
    )
  }

}

export default Layout