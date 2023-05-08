import { FC } from 'react'
import ReactPaginate from 'react-paginate'

import { useAppDispatch } from '../../../types/types'

import { setCurrentPage } from '../../../redux/slices/filterSlice'

import styles from './Pagination.module.scss'

type PropsType = {
  currentPage: number
}

export const Pagination: FC<PropsType> = ({ currentPage }) => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <ReactPaginate
        className={styles.paginate}
        breakLabel='...'
        nextLabel=' >'
        previousLabel='< '
        onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
        pageRangeDisplayed={4}
        pageCount={5}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={() => null}
      />
    </div>
  )
}
