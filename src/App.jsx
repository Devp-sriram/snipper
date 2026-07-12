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
    <div className="app-shell">
      <header className="site-header" style={{backgroundColor:'#712cf9'}}>
        <a className="brand" href="/" aria-label="Snipper home">
          <span className="brand-mark">
            <img src='rb.svg'/>
          </span>
          <span>
            <strong style={{color:"white"}}>Bootstrap Snippets</strong>
          </span>
        </a>

        <label className="search-field" htmlFor="snippet-search">
          <FiSearch aria-hidden="true" />
          <input
            id="snippet-search"
            type="search"
            placeholder="Search snippets"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </header>

      <div className="workspace">
        <aside className="sidebar" aria-label="Snippet navigation">
          <nav>
            <p className="sidebar-label">Categories</p>
            {categories.map((category) => (
              <button
                className={category === activeCategory ? 'nav-item active' : 'nav-item'}
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                <FiHash aria-hidden="true" />
                <span>{category}</span>
              </button>
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
