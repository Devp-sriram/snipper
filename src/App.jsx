import { useMemo, useState } from 'react'
import { snippets } from './snippets/snip'
import {
  FiBox,
  FiCheck,
  FiClipboard,
  FiCode,
  FiCopy,
  FiDatabase,
  FiFileText,
  FiHash,
  FiLayers,
  FiSearch,
  FiTerminal,
} from 'react-icons/fi'
import './App.css'

const categories = ['All snippets', 'Commands', 'Components', 'Auth', 'Features', 'Pages', 'Layout', 'Utilities']

function App() {
  const [activeCategory, setActiveCategory] = useState('All snippets')
  const [query, setQuery] = useState('')
  const [copiedId, setCopiedId] = useState('')

  const filteredSnippets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return snippets.filter((snippet) => {
      const categoryMatches =
        activeCategory === 'All snippets' || snippet.category === activeCategory
      const queryMatches =
        !normalizedQuery ||
        [snippet.title, snippet.language, snippet.category, snippet.description]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      return categoryMatches && queryMatches
    })
  }, [activeCategory, query])

  const copySnippet = async (snippet) => {
    await navigator.clipboard.writeText(snippet.code)
    setCopiedId(snippet.id)
    window.setTimeout(() => setCopiedId(''), 1600)
  }

  return (
    <div className="app-shell">
      <header className="site-header" style={{ backgroundColor: '#712cf9' }}>
        <a className="brand" href="/" aria-label="Snipper home">
          <span className="brand-mark">
            <img src='rb.svg' />
          </span>
          <span>
            <strong style={{ color: "white" }}>Bootstrap Snippets</strong>
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

          <div className="sidebar-panel">
            <FiFileText aria-hidden="true" />
            <p>Duplicate the template in <code>src/App.jsx</code> and replace the fields.</p>
          </div>
        </aside>

        <main className="main-content">
          <section className="page-title" aria-labelledby="page-heading">
            <div>
              <p className="eyebrow">Snippet Library</p>
              <h1 id="page-heading">Store, scan, and copy your best code snippets.</h1>
            </div>
            <div className="stats-grid" aria-label="Snippet stats">
              <span>
                <FiLayers aria-hidden="true" />
                {snippets.length} snippets
              </span>
              <span>
                <FiDatabase aria-hidden="true" />
                {categories.length - 1} groups
              </span>
            </div>
          </section>

          <section className="snippet-grid" aria-label="Snippet results">
            {filteredSnippets.map((snippet) => (
              <article className="snippet-card" key={snippet.id}>
                <div className="snippet-card-header">
                  <div>
                    <span className="language-pill">{snippet.language}</span>
                    <h2>{snippet.title}</h2>
                    <p>{snippet.description}</p>
                  </div>
                  <button
                    className={copiedId === snippet.id ? 'copy-button copied' : 'copy-button'}
                    type="button"
                    onClick={() => copySnippet(snippet)}
                    aria-label={`Copy ${snippet.title}`}
                    title={`Copy ${snippet.title}`}
                  >
                    {copiedId === snippet.id ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
                  </button>
                </div>

                <pre>
                  <code className='home-cards'>{snippet.code}</code>
                </pre>
              </article>
            ))}
          </section>

          <section className="template-section" aria-labelledby="template-heading">
            <div className="template-copy">
              <FiClipboard aria-hidden="true" />
              <div>
                <p className="eyebrow">Add Your Own</p>
                <h2 id="template-heading">Snippet template</h2>
                <p>Paste this object into the <code>snippets</code> array and edit the values.</p>
              </div>
            </div>
            <pre>
              <code>{`{
  id: 'unique-snippet-id',
  title: 'Snippet Title',
  language: 'JavaScript',
  category: 'Utilities',
  description: 'Short note about when to use this snippet.',
  code: \`paste your code here\`,
},`}</code>
            </pre>
          </section>
        </main>
      </div>

      <footer className="site-footer">
        <span>
          <FiTerminal aria-hidden="true" />
          Built for manual snippet curation
        </span>
        <span>
          <FiBox aria-hidden="true" />
          Edit snippets in <code>src/App.jsx</code>
        </span>
      </footer>
    </div>
  )
}

export default App
