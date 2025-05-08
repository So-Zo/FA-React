import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/ui/global.css' // This now imports reset.css
// import './index.css' // Commented out as it's now redundant with our custom styling
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
