import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { SiteContentProvider } from './context/SiteContentContext'
import './styles.css'

const isGitHubPages = window.location.hostname.endsWith('github.io')
const Router = isGitHubPages ? HashRouter : BrowserRouter
const routerProps = isGitHubPages ? {} : { basename: import.meta.env.BASE_URL }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminAuthProvider>
      <SiteContentProvider>
        <Router
          {...routerProps}
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