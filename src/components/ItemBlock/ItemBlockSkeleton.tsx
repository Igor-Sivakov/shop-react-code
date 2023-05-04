import ContentLoader from 'react-content-loader'
import styles from './ItemBlock.module.scss'

export const ItemBlockSkeleton = () => (
  <ContentLoader
    className={styles.item_block}
    speed={2}
    width={280}
    height={465}
    viewBox='0 0 280 465'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <rect x='0' y='417' rx='10' ry='10' width='100' height='35' />
    <rect x='0' y='270' rx='10' ry='10' width='280' height='25' />
    <rect x='128' y='410' rx='25' ry='25' width='152' height='47' />
    <rect x='0' y='310' rx='10' ry='10' width='280' height='88' />
    <circle cx='140' cy='126' r='125' />
  </ContentLoader>
)
