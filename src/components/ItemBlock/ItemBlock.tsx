import { FC, memo, useState } from 'react'
import { Link } from 'react-router-dom'

import plugImg from '../../assets/img/plugVape.webp'

import { useAppDispatch, useAppSelector } from '../../types/types'

import { addItemsToCart, CartItemType } from '../../redux/slices/cartSlice'
import { getCartItemsSelect } from '../../redux/selectors/selectors'

import styles from './ItemBlock.module.scss'
import '../../scss/_button.scss'

type PropsType = {
  imageUrl: string
  title: string
  price: number
  sizes: number[]
  types: number[]
  id: string
}

const nameTypes = ['Nicotine 3%', 'Nicotine 5%']

export const ItemBlock: FC<PropsType> = memo(
  ({ imageUrl, title, price, sizes, types, id }) => {
    const cartItems = useAppSelector(getCartItemsSelect).find(
      (obj) => obj.id === id
    )
    const [activeType, setActiveType] = useState(0)
    const [activeSize, setActiveSize] = useState(0)

    const dispatch = useAppDispatch()

    const currentSize = sizes.find((s, index) => index === activeSize)

    const addedCount = cartItems ? cartItems.count : null

    const addOnClick = () => {
      const item: CartItemType = {
        id,
        imageUrl,
        title,
        price,
        type: nameTypes[activeType],
        size: currentSize || 500,
        count: 0,
      }
      dispatch(addItemsToCart(item))
    }

    return (
      <div className={styles.container}>
        <div className={styles.item_block}>
          <Link to={`/product/${id}`}>
            <img
              className={styles.item_block__image}
              src={imageUrl ? imageUrl : plugImg}
              alt='Pizza'
            />
            <h4 className={styles.item_block__title}>{title}</h4>
          </Link>

          <div className={styles.item_block__selector}>
            <ul>
              {types.map((type, i) => (
                <li
                  key={i}
                  onClick={() => setActiveType(type)}
                  className={activeType === type ? styles.active : ''}
                >
                  {nameTypes[type]}
                </li>
              ))}
            </ul>

            <ul>
              {sizes.map((size, i) => (
                <li
                  key={i}
                  onClick={() => setActiveSize(i)}
                  className={activeSize === i ? styles.active : ''}
                >
                  {size} pfs.
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.item_block__bottom}>
            <div className={styles.item_block__price}>from {price} $</div>

            <button
              onClick={addOnClick}
              className='button button--outline button--add'
            >
              <svg
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                  fill='white'
                />
              </svg>
              <span>Add ot cart</span>
              {addedCount && <i>{addedCount}</i>}
            </button>
          </div>
        </div>
      </div>
    )
  }
)
