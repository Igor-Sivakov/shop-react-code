import axios from 'axios'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

const instance = axios.create({
  baseURL: 'https://63ecedf732a0811723a53996.mockapi.io/',
})

export type ResponseAPIProductsType = {
  id: string
  imageUrl: string
  title: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  rating: number
}


export const mainAPI = {
  async getOneItem(id: string) {
    return await instance.get<ResponseAPIProductsType[]>(`items?id=${id}`).then((res) => res.data)
  },
  async getItemsByCategoryAndSortProperty(categoryId: number, sortProperty: string, currentPage: number, searchValue: string) {
    const order = sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortProperty.replace('-', '')
    const search = searchValue ? searchValue : ''
    const category = categoryId !== 0 ? categoryId : ''

    return await instance.get<ResponseAPIProductsType[]>(`items`, {
      params: pickBy(
        {
          page: currentPage,
          limit: 8,
          category,
          sortBy,
          order,
          search
        },
        identity
      )
    }).then((res) => res.data)
  },
  async getItems() {
    return await instance.get<ResponseAPIProductsType[]>(`items?page=1&limit=8`).then((res) => res.data)
  }
}

/* 
const category = categoryId !== 0 ? `&category=${categoryId}` : ''
const value = searchValue ? `&search=${searchValue}` : ''
instance.get<ResponseAPIProductsType[]>(`items?page=${currentPage}&limit=8${category}&sortBy=${sortBy}&order=${order}${value}`).then((res) => res.data)
*/