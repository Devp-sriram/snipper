import { BrowserRouter, Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Featured from './snippets/featured.mdx'
import Commands from './snippets/categories/commands.mdx'
import Components from './snippets/categories/components.mdx'
import Auth from './snippets/categories/auth.mdx'
import Pages from './snippets/categories/pages.mdx'
import Layout from './snippets/categories/layout.mdx'
import Utilities from './snippets/categories/utilities.mdx'
import './App.css'

const navItems = [
  { to: '/', label: 'Featured', end: true },
  { to: '/category/commands', label: 'Commands' },
  { to: '/category/components', label: 'Components' },
  { to: '/category/auth', label: 'Auth' },
  { to: '/category/pages', label: 'Pages' },
  { to: '/category/layout', label: 'Layout' },
  { to: '/category/utilities', label: 'Utilities' },
]

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar" aria-label="Documentation navigation">
          <Link className="brand" to="/" aria-label="Bootstrap snippets home">
            <span className="brand-mark">
              <img src="/rb.svg" alt="" />
            </span>
            <strong>Bootstrap Snippets</strong>
          </Link>

          <nav className="doc-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="doc-content">
          <Routes>
            <Route path="/" element={<Featured />} />
            <Route path="/category/commands" element={<Commands />} />
            <Route path="/category/components" element={<Components />} />
            <Route path="/category/auth" element={<Auth />} />
            <Route path="/category/pages" element={<Pages />} />
            <Route path="/category/layout" element={<Layout />} />
            <Route path="/category/utilities" element={<Utilities />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
