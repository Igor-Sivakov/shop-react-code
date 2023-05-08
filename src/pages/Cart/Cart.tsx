import { FC } from 'react'
import cn from 'classnames'

import { useAppSelector } from '../../types/types'

import {
  getCartItemsSelect,
  getTotalPriceSelect,
} from '../../redux/selectors/selectors'

import {
  CartItem,
  TopSegment,
  BottomSegment,
  EmptyCart,
} from '../../components'

import styles from './Cart.module.scss'

const Cart: FC = () => {
  const items = useAppSelector(getCartItemsSelect)
  const totalPrice = useAppSelector(getTotalPriceSelect)

  return (
    <div className={cn(styles.container, styles.container__cart)}>
      {totalPrice === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <TopSegment />
          {items.map((obj) => (
            <CartItem key={obj.id} {...obj} />
          ))}

          <BottomSegment />
        </>
      )}
    </div>
  )
}

export default Cart
