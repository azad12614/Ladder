import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const URL = `http://localhost:3000`;

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <App URL={[URL]}/>
  //</React.StrictMode>,
)
