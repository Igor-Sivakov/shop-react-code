import { CartItemType } from '../redux/slices/cartSlice'
import { calcTotalCount } from './calcTotalCount'
import { calcTotalPrice } from './calcTotalPrice'

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart')
  const items = data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items)
  const totalCountItems = calcTotalCount(items)

  return {
    items: items as CartItemType[],
    totalPrice,
    totalCountItems
  }
}