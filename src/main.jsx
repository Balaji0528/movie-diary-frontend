import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#1c2228",
          color: "#fff",
          border: "1px solid #374151",
        },
      }}
    />
    <App />
  </StrictMode>,
)
