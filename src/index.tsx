import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { store } from './redux/store'
import App from './App'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
