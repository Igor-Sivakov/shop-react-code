import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import { useAppSelector } from '../../../types/types'

import {
  getTotalCountItemsSelect,
  getTotalPriceSelect,
} from '../../../redux/selectors/selectors'

import styles from './BottomSegment.module.scss'
import '../../../scss/_button.scss'

export const BottomSegment: FC = () => {
  const totalPrice = useAppSelector(getTotalPriceSelect)
  const totalCount = useAppSelector(getTotalCountItemsSelect)

  return (
    <div className={styles.cart__bottom}>
      <div className={styles.cart__bottom_details}>
        <span>
          Total goods: <b>{totalCount} pc.</b>
        </span>
        <span>
          Total price: <b>{totalPrice} $</b>
        </span>
      </div>

      <div className={styles.cart__bottom_buttons}>
        <NavLink
          to='/'
          className={cn(
            styles.go_back_btn,
            'button button--outline button--add'
          )}
        >
          <svg
            width='8'
            height='14'
            viewBox='0 0 8 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7 13L1 6.93015L6.86175 1'
              stroke='#D3D3D3'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>

          <span>Go back</span>
        </NavLink>

        <div className={cn(styles.pay_btn, 'button')}>
          <span>Pay now</span>
        </div>
      </div>
    </div>
  )
}
