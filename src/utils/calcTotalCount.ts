import { CartItemType } from "../redux/slices/cartSlice"

export const calcTotalCount = (items: CartItemType[]) => {
  return items.reduce((sum, obj) => {
    return obj.count + sum
  }, 0)
}