import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  ALPHABET_DESC = 'title',
  ALPHABET_ASC = '-title',

}

export type SortValue = {
  name: string
  sortProperty: SortPropertyEnum
}

type SearchItemsParams = {
  categoryId: number
  sortProperty: SortPropertyEnum
  currentPage: number
  sortType: SortValue
}

interface InitStateFilter {
  sortType: SortValue
  categoryId: number
  currentPage: number
  searchValue: string
}

const initialState: InitStateFilter = {
  sortType: {
    name: 'alphabet (ascending)',
    sortProperty: SortPropertyEnum.ALPHABET_ASC,
  },
  categoryId: 0,
  currentPage: 1,
  searchValue: ''
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSortType(state, action: PayloadAction<SortValue>) {
      state.sortType = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<SearchItemsParams>) {
      state.sortType = action.payload.sortType
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
    }
  }
})

export const { setSearchValue, setCategoryId, setSortType, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer