import { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import debounce from 'lodash.debounce'

import { useAppDispatch } from '../../types/types'

import { setCurrentPage, setSearchValue } from '../../redux/slices/filterSlice'

import styles from './Search.module.scss'

type PropsType = {}

export const Search: FC<PropsType> = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [value, setValue] = useState('')

  const dispatch = useAppDispatch()

  // eslint-disable-next-line
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
      dispatch(setCurrentPage(1))
    }, 300),
    []
  )

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <div className={styles.container}>
      <svg
        className={styles.searchIcon}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 512 512'
      >
        <path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
      </svg>

      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        type='text'
        placeholder='Search pizza...'
      />

      {value && (
        <svg
          className={styles.clearIcon}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 320 512'
          onClick={onClickClear}
        >
          <path d='M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z' />
        </svg>
      )}
    </div>
  )
}
