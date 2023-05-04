import { FC, memo, useEffect, useRef } from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { setFilters, SortPropertyEnum } from '../../redux/slices/filterSlice'
import {
  fetchProducts,
  fetchProductsByCategoryAndSortProperty,
} from '../../redux/slices/productSlice'
import {
  getCategoryIdSelect,
  getCurrentPageSelect,
  getProductsSelect,
  getProductsStatusSelect,
  getSearchValueSelect,
  getSortTypeSelect,
} from '../../redux/selectors/selectors'
import { useAppDispatch, useAppSelector } from '../../types/types'
import {
  Pagination,
  SortPopup,
  sortList,
  Categories,
  ItemBlock,
  ItemBlockSkeleton,
} from '../../components'
import styles from './Home.module.scss'

export const Home: FC = memo(() => {
  const searchValue = useAppSelector(getSearchValueSelect)
  const currentPage = useAppSelector(getCurrentPageSelect)
  const items = useAppSelector(getProductsSelect)
  const categoryId = useAppSelector(getCategoryIdSelect)
  const { sortProperty } = useAppSelector(getSortTypeSelect)
  const isLoading = useAppSelector(getProductsStatusSelect)
  const isSearch = useRef(false)
  const isMaunted = useRef(false)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const fetchByCategoryAndSort = async () => {
    await dispatch(
      fetchProductsByCategoryAndSortProperty({
        categoryId,
        sortProperty,
        currentPage,
        searchValue,
      })
    )
  }

  //if the parameters were changed and there was a first render
  useEffect(() => {
    if (isMaunted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMaunted.current = true
  }, [categoryId, sortProperty, currentPage, navigate])

  //if there was a first render, then check the parameters and save in redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sortType = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      )

      const searchParams = {
        categoryId: Number(params.categoryId),
        sortProperty: params.SortProperty as SortPropertyEnum,
        currentPage: Number(params.currentPage),
        sortType: sortType || sortList[5],
      }
      dispatch(setFilters(searchParams))

      isSearch.current = true
    }
  }, [dispatch])

  //if there was a first render, then we request items by parametrs
  useEffect(() => {
    if (!isSearch.current) {
      fetchByCategoryAndSort()
    }
    isSearch.current = false
    window.scrollTo(0, 0)
    // eslint-disable-next-line
  }, [categoryId, sortProperty, currentPage, searchValue])

  // first loading
  useEffect(() => {
    dispatch(fetchProducts())
    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <Categories />
        <SortPopup />
      </div>
      <h2 className={styles.content__title}>All vapes</h2>
      {isLoading === 'error' ? (
        <div className={styles.error_info}>
          Ups, somthing went wrong
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM159.3 388.7c-2.6 8.4-11.6 13.2-20 10.5s-13.2-11.6-10.5-20C145.2 326.1 196.3 288 256 288s110.8 38.1 127.3 91.3c2.6 8.4-2.1 17.4-10.5 20s-17.4-2.1-20-10.5C340.5 349.4 302.1 320 256 320s-84.5 29.4-96.7 68.7zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z' />
          </svg>
          ...
        </div>
      ) : (
        <div className={styles.content__items}>
          {isLoading === 'loading'
            ? [...Array(8)].map((_, i) => <ItemBlockSkeleton key={i} />)
            : items.map((items) => <ItemBlock key={items.id} {...items} />)}
        </div>
      )}
      <div className={styles.pagination}>
        <Pagination currentPage={currentPage} />
      </div>
    </div>
  )
})
