import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit"
import { SortPropertyEnum } from './filterSlice'
import { mainAPI, ResponseAPIProductsType } from '../../API/API'


export enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface InitStateProducts {
  product: {
    items: ResponseAPIProductsType[]
    status: StatusEnum
  }
}

const initialState: InitStateProducts = {
  product: {
    items: [],
    status: StatusEnum.LOADING
  }
}

export const fetchProducts = createAsyncThunk<ResponseAPIProductsType[], void>('product/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    return await mainAPI.getItems()

  } catch (error) {
    console.log(error)
    return rejectWithValue('some error')
  }
})

export type FetchProductsArg = {
  categoryId: number
  sortProperty: SortPropertyEnum
  currentPage: number
  searchValue: string
}

export const fetchProductsByCategoryAndSortProperty = createAsyncThunk<ResponseAPIProductsType[], FetchProductsArg>('product/fetchProductsByCategoryAndSortProperty',
  async (params, { rejectWithValue }) => {
    const { categoryId, sortProperty, currentPage, searchValue } = params
    try {
      return await mainAPI.getItemsByCategoryAndSortProperty(categoryId, sortProperty, currentPage, searchValue)

    } catch (error) {
      console.log(error)
      return rejectWithValue('some error')
    }
  })

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(fetchProductsByCategoryAndSortProperty.pending, fetchProducts.pending), (state) => {
        state.product.items = []
        state.product.status = StatusEnum.LOADING
      })
      .addMatcher(isAnyOf(fetchProductsByCategoryAndSortProperty.fulfilled, fetchProducts.fulfilled), (state, action: PayloadAction<ResponseAPIProductsType[]>) => {
        state.product.items = action.payload
        state.product.status = StatusEnum.SUCCESS
      })
      .addMatcher(isAnyOf(fetchProductsByCategoryAndSortProperty.rejected, fetchProducts.rejected), (state) => {
        state.product.items = []
        state.product.status = StatusEnum.ERROR
      })
  }
})


export default productSlice.reducer
