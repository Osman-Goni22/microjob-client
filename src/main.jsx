import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './Pages/Router/Route.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Provider/AuthProvider.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
    
     <QueryClientProvider client={queryClient}>
        
          <RouterProvider router={router} />

          <ToastContainer position='top-center' />
      </QueryClientProvider>
     </AuthProvider>
  </StrictMode>,
)
