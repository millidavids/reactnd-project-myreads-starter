import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <App categories={['Currently Reading', 'Want To Read', 'Read']}/>
  </BrowserRouter>,
  document.getElementById('root')
)
