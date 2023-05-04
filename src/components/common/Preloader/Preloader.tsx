import PreloaderItem from './../../../assets/img/Preloader.svg'
import styles from './Preloader.module.scss'

export const Preloader = () => {
  return (
    <div className={styles.container}>
      <img src={PreloaderItem} alt='preloader' />
    </div>
  )
}
