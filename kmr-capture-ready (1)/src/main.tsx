import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './index'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
)

// Auto-resize support for embedding in Hocoos via iframe
setInterval(() => {
  const h = document.documentElement.scrollHeight || document.body.scrollHeight;
  window.parent?.postMessage({ kmrEmbedHeight: h }, '*');
}, 1000);
