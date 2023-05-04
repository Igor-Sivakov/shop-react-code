import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import plugImg from '../../assets/img/plugVape.webp'
import { mainAPI, ResponseAPIProductsType } from '../../API/API'
import { Preloader } from '../../components'
import styles from './FullItem.module.scss'

const FullItem: FC = () => {
  const [data, setData] = useState<ResponseAPIProductsType>()

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const response = await mainAPI.getOneItem(id.toString())
          setData(response[0])
        } catch (error) {
          console.log(error)
          alert('Ops, somting went wrong...')
          navigate('/')
        }
      }
      fetchItem()
    }
  }, [id, navigate])

  if (!data) {
    return <Preloader />
  }

  return (
    <div className={styles.container}>
      <img src={data.imageUrl ? data.imageUrl : plugImg} alt='some' />
      <div className={styles.info__wrapper}>
        <h1 className={styles.info__title}>{data.title}</h1>
        <div className={styles.info__description_block}>
          <h3>Description</h3>
          <p>
            <span>Elf bar 1500</span> – these are thin pre-seasoned disposable
            subsystems. The device consists of a battery with a capacity 850 mAh
            and 4.8 ml pre-filled cartridge, supporting up to 1500 puffs.
          </p>
        </div>
        <div className={styles.info__mainInfo}>
          <h2>WHAT IS IT ELF BAR ?</h2>
          <p>
            <span>Elf Bar</span> were and remain one of the best-selling in the
            disposable vape market. They gradually become disposable most
            vapers. Elf Bar became popular thanks to incredible ease of use, and
            do not require any vaping experience. Just take it out of the
            package and inhale to get a dose of nicotine. Universal disposable
            vape enough small enough to fit in your pocket and fit in the palm
            of your hand, and in the same time offers more than 25 flavors. Elf
            Bar offers a very cheap way to quit smoking and start smoking
            unnecessarily buy any other parts or liquids for electronic
            cigarettes.Together with 5% nicotine content and fast activation
            puffs <span>Elf ​​1500</span> is a good choice for daily vaping.
          </p>
        </div>
        <div className={styles.info__characteristicsAndOptions}>
          <h3>Main characteristics:</h3>
          <ul>
            <li>Compact disposable cigarette</li>
            <li>Convenient to carry</li>
            <li>Various flavors</li>
            <li>Built-in 850mAh battery for 1500 puffs</li>
            <li>4.8ml pre-filled cartridge</li>
          </ul>
        </div>
        <div className={styles.info__characteristicsAndOptions}>
          <h3>Options:</h3>
          <ul>
            <li>Size: 19x100mm</li>
            <li>Capacity: 4.8ml</li>
            <li>Nicotine level: 3% or 5%</li>
            <li>Battery capacity: 850 mAh</li>
            <li>Puff: 1500 puffs</li>
          </ul>
        </div>
        <h4 className={styles.info__price}>Price {data.price} $</h4>
      </div>
    </div>
  )
}

export default FullItem
