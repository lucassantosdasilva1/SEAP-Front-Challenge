import styles from './button.module.scss';

interface buttonProps {
  title: string,
  
}

export default function ButtonHome() {
  return (
    <a className={styles.myButton} href={}>
      Detentos
    </a>
  )
}