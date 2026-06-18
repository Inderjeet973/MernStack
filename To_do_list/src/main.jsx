import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='219907979492-e9m6j3l4vg0jmmi94omr8t5qhumcv6f6.apps.googleusercontent.com'>
      <App />
      <ToastContainer />
    </GoogleOAuthProvider>

  </StrictMode>,
)
