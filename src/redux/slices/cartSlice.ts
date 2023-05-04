import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from './../../utils/calcTotalPrice'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { calcTotalCount } from '../../utils/calcTotalCount'


export type CartItemType = {
  id: string
  imageUrl: string
  title: string
  type: string
  size: number
  price: number
  count: number
}

interface InitStateCart {
  items: CartItemType[]
  totalPrice: number
  totalCountItems: number
}

const { items, totalPrice, totalCountItems } = getCartFromLS()

const initialState: InitStateCart = {
  items,
  totalPrice,
  totalCountItems
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemsToCart(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }

      state.totalCountItems = calcTotalCount(state.items)

      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>) {

      const findItem = state.items.find(obj => obj.id === action.payload)

      if (findItem) {
        findItem.count--
        state.totalPrice = state.totalPrice - findItem.price
        state.totalCountItems = state.totalCountItems - 1
        if (findItem.count === 0) {
          state.items = state.items.filter((obj) => obj.id !== action.payload)
        }
      }
    },
    removeItemsFromCart(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem) {
        state.totalCountItems = state.totalCountItems - findItem.count
        state.totalPrice = state.totalPrice - findItem.price * findItem.count
        state.items = state.items.filter((obj) => obj.id !== action.payload)
      }
    },
    clearItemsCart(state) {
      state.items = []
      state.totalCountItems = 0
      state.totalPrice = 0
    }
  }
})

export const { addItemsToCart, removeItemsFromCart, clearItemsCart, minusItem } = cartSlice.actions

export default cartSlice.reducer