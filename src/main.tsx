import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ActivityContextProvider } from './context/ActivityContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ActivityContextProvider>
      <App />
    </ActivityContextProvider>
  </StrictMode>,
)
