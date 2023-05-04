import { FC, memo, useEffect, useRef, useState } from 'react'
import { setSortType, SortPropertyEnum } from '../../redux/slices/filterSlice'
import { SortValue } from '../../redux/slices/filterSlice'
import { getSortTypeSelect } from '../../redux/selectors/selectors'
import { useAppDispatch, useAppSelector } from '../../types/types'
import styles from './SortPopup.module.scss'

export const sortList: SortValue[] = [
  { name: 'rating (descending)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'rating (ascending)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'price (descending)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'price (ascending)', sortProperty: SortPropertyEnum.PRICE_ASC },
  {
    name: 'alphabet (descending)',
    sortProperty: SortPropertyEnum.ALPHABET_DESC,
  },
  { name: 'alphabet (ascending)', sortProperty: SortPropertyEnum.ALPHABET_ASC },
]

export const SortPopup: FC = memo(() => {
  const [isOpen, setIsOpen] = useState(false)
  const value = useAppSelector(getSortTypeSelect)
  const sortRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()

  const choiceSort = (sortProperty: SortValue) => {
    dispatch(setSortType(sortProperty))
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (!event.composedPath().includes(sortRef.current as EventTarget)) {
        setIsOpen(false)
      }
    }
    document.body.addEventListener('click', handleClickOutSide)

    return () => document.body.removeEventListener('click', handleClickOutSide)
  }, [])

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.sort__label}>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{value.name}</span>
      </div>
      {isOpen && (
        <div className={styles.sort__popup}>
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => choiceSort(obj)}
                className={value === obj ? styles.active : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
})
