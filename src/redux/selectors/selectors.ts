import { RootState } from './../store'

/* Products slice */

export const getProductsSelect = (store: RootState) => (store.products.product.items)

export const getProductsStatusSelect = (store: RootState) => (store.products.product.status)

/* Filter slice */

export const getSearchValueSelect = (store: RootState) => (store.filter.searchValue)

export const getCategoryIdSelect = (store: RootState) => (store.filter.categoryId)

export const getSortTypeSelect = (store: RootState) => (store.filter.sortType)

export const getCurrentPageSelect = (store: RootState) => (store.filter.currentPage)

/* Cart slice */

export const getCartItemsSelect = (store: RootState) => (store.cart.items)

export const getTotalPriceSelect = (store: RootState) => (store.cart.totalPrice)

export const getTotalCountItemsSelect = (store: RootState) => (store.cart.totalCountItems)
