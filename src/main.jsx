import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider, useAuth } from './context/authContext';
import { CartProvider } from './modules/Cart/context/CartContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartWrapper />
    </AuthProvider>
  </StrictMode>,
)

// Nuevo componente que puede usar useAuth porque ya está dentro del AuthProvider
function CartWrapper() {
  const { user } = useAuth()

  return (
    <CartProvider userId={user?.id}>
      <App />
    </CartProvider>
  )
}