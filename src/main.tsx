import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import MorpheusPage from './morpheus_page'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MorpheusPage />
  </StrictMode>,
)
