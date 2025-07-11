import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import store from './Redux/App/store'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App/>
      <ToastContainer/>
    </Provider>
        </BrowserRouter>
  </StrictMode>,
)
