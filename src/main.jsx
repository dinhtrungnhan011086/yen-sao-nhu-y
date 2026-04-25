import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { SiteContentProvider } from './context/SiteContentContext'
import './styles.css'

const Router = window.location.hostname.endsWith('github.io')
  ? HashRouter
  : BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminAuthProvider>
      <SiteContentProvider>
        <Router
          basename={import.meta.env.BASE_URL}
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          <App />
        </Router>
      </SiteContentProvider>
    </AdminAuthProvider>
  </React.StrictMode>,
)