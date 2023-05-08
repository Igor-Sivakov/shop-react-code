import { FC, memo } from 'react'

import { useAppDispatch, useAppSelector } from '../../types/types'

import { setCategoryId, setCurrentPage } from '../../redux/slices/filterSlice'
import { getCategoryIdSelect } from '../../redux/selectors/selectors'

import styles from './Categories.module.scss'

export const Categories: FC = memo(() => {
  const categories = [
    'All',
    'Sweet',
    'Sweet & Sour',
    'Sour',
    'Fresh',
    'Intense',
  ]
  const value = useAppSelector(getCategoryIdSelect)

  const dispatch = useAppDispatch()

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => {
              dispatch(setCategoryId(i))
              dispatch(setCurrentPage(1))
            }}
            className={value === i ? styles.active : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
})
