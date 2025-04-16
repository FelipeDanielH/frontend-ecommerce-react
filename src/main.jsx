import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider, useAuth } from './context/authContext';
import { CartProvider } from './modules/Cart/context/CartContext';

function RootApp() {
  const { user } = useAuth();

  return (
    <CartProvider userId={user?.id}>
      <App />
    </CartProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RootApp />
    </AuthProvider>
  </StrictMode>,
)
