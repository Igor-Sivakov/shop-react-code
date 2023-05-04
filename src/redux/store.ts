import { configureStore } from "@reduxjs/toolkit"
import filterSlice from './slices/filterSlice'
import productSlice from './slices/productSlice'
import cartSlice from './slices/cartSlice'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const store = configureStore({
  reducer: {
    filter: filterSlice,
    products: productSlice,
    cart: cartSlice,
  }
})







