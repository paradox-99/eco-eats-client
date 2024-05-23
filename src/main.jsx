import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import AuthProv from './provider/AuthProv'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProv>
      <HelmetProvider>
        <Helmet>
          <title>EcoEats</title>
        </Helmet>
        <RouterProvider router={router} />
        <Toaster />
      </HelmetProvider>
    </AuthProv>
  </React.StrictMode>,
)
