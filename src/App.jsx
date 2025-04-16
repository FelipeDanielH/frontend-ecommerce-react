import { useState } from 'react'
import reactLogo from './assets/react.svg'
import AppRoutes from './routes';
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
