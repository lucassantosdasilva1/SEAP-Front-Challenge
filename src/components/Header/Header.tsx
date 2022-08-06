import styles from './header.module.scss';

export default function Header() {
  return (
      <>
        <div className={styles.container}>
          <div className={styles.title}>
            <img alt="SIISP" src="./logo.png" className={styles.logo}/>
          </div>
        </div>
      </>
    );
  }