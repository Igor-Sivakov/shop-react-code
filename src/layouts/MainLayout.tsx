import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components'
import styles from './MainLayout.module.scss'

export const MainLayout: FC = () => {
  return (
    <main className={styles.root}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </main>
  )
}
