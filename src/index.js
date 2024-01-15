import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
globalThis.process = {
  env: { NODE_ENV: 'development' }, // Set your desired environment here
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
