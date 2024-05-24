import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import AuthProv from './provider/AuthProv'
import { Toaster } from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProv>
        <HelmetProvider>
          <Helmet>
            <title>EcoEats</title>
          </Helmet>
          <RouterProvider router={router} />
          <Toaster />
        </HelmetProvider>
      </AuthProv>
    </QueryClientProvider>
  </React.StrictMode>,
)
