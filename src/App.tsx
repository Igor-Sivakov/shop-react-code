import { FC, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './pages/Home/Home'
import { NotFound } from './pages/ NotFound/ NotFound'
import { Preloader } from './components'

const Cart = lazy(
  () => import(/* webpackChunkName: "Cart" */ './pages/Cart/Cart')
)
const FullItem = lazy(
  () => import(/* webpackChunkName: "FullItem" */ './pages/FullItem/FullItem')
)

const App: FC = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='product/:id' element={<FullItem />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
