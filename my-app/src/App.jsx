import { useState } from 'react'
import Card from './components/Card'
import './index.css'

// ── Data array (passed as props to each Card) ───────────────────────────────
const PROFILES = [
  {
    id: 1,
    avatar: '🎨',
    name: 'Sofia Ramirez',
    role: 'UI/UX Designer',
    company: 'PixelCraft Studio',
    location: 'Barcelona, Spain',
    rating: 4.8,
    bio: 'Crafting pixel-perfect interfaces with a passion for accessibility and motion design. 7+ years turning complex ideas into beautiful, intuitive experiences.',
    skills: ['Figma', 'Framer', 'CSS', 'Prototyping'],
    stats: [
      { label: 'Projects', value: '128' },
      { label: 'Clients', value: '54' },
      { label: 'Reviews', value: '4.8★' },
    ],
    gradientColors: ['#7c3aed', '#a855f7', '#ec4899'],
    delay: 0,
  },
  {
    id: 2,
    avatar: '⚡',
    name: 'Liam Chen',
    role: 'Full-Stack Engineer',
    company: 'NovaTech Labs',
    location: 'San Francisco, USA',
    rating: 4.9,
    bio: 'Building scalable web applications with React, Node.js and cloud-native architectures. Open-source contributor and performance enthusiast.',
    skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
    stats: [
      { label: 'Commits', value: '3.2k' },
      { label: 'PRs', value: '847' },
      { label: 'Stars', value: '12k' },
    ],
    gradientColors: ['#2563eb', '#0ea5e9', '#06b6d4'],
    delay: 0.15,
  },
  {
    id: 3,
    avatar: '🤖',
    name: 'Aisha Patel',
    role: 'AI/ML Engineer',
    company: 'DeepMind Labs',
    location: 'London, UK',
    rating: 5.0,
    bio: 'Pioneering machine learning solutions for real-world problems. Specialized in NLP and computer vision models deployed at production scale.',
    skills: ['Python', 'PyTorch', 'LLMs', 'MLOps'],
    stats: [
      { label: 'Models', value: '47' },
      { label: 'Papers', value: '19' },
      { label: 'Citations', value: '2.1k' },
    ],
    gradientColors: ['#059669', '#10b981', '#34d399'],
    delay: 0.3,
  },
  {
    id: 4,
    avatar: '🔐',
    name: 'Marcus Webb',
    role: 'Cybersecurity Expert',
    company: 'ShieldCore Inc.',
    location: 'Berlin, Germany',
    rating: 4.7,
    bio: 'Ethical hacker and security architect with a decade of experience securing enterprise infrastructures. OSCP & CISSP certified.',
    skills: ['Pentesting', 'SIEM', 'Zero Trust', 'Python'],
    stats: [
      { label: 'CVEs', value: '23' },
      { label: 'Audits', value: '310' },
      { label: 'Bugs Fixed', value: '1.9k' },
    ],
    gradientColors: ['#dc2626', '#f97316', '#fbbf24'],
    delay: 0.45,
  },
  {
    id: 5,
    avatar: '📱',
    name: 'Yuki Tanaka',
    role: 'Mobile Developer',
    company: 'AppForge Tokyo',
    location: 'Tokyo, Japan',
    rating: 4.6,
    bio: 'Cross-platform mobile wizard crafting buttery-smooth apps with React Native and Flutter. App Store featured developer with 20M+ downloads.',
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    stats: [
      { label: 'Apps', value: '31' },
      { label: 'Downloads', value: '20M' },
      { label: 'Rating', value: '4.9★' },
    ],
    gradientColors: ['#db2777', '#9333ea', '#7c3aed'],
    delay: 0.6,
  },
  {
    id: 6,
    avatar: '☁️',
    name: 'Zara Okonkwo',
    role: 'Cloud Architect',
    company: 'Stratos Cloud',
    location: 'Lagos, Nigeria',
    rating: 4.9,
    bio: 'Designing resilient, cost-optimized multi-cloud architectures. AWS Hero and Google Cloud Champion helping companies scale without limits.',
    skills: ['AWS', 'GCP', 'Kubernetes', 'Terraform'],
    stats: [
      { label: 'Infras', value: '89' },
      { label: 'Saved $', value: '4.2M' },
      { label: 'Uptime', value: '99.99%' },
    ],
    gradientColors: ['#0284c7', '#0ea5e9', '#38bdf8'],
    delay: 0.75,
  },
]

// ── Filter button component ─────────────────────────────────────────────────
function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`filter-btn ${active ? 'active' : ''}`}
    >
      {label}
    </button>
  )
}

// ── Stats summary bar ───────────────────────────────────────────────────────
function SummaryBar({ profiles }) {
  const avgRating = (profiles.reduce((a, p) => a + p.rating, 0) / profiles.length).toFixed(1)
  const totalProjects = profiles.reduce((a, p) => a + parseInt(p.stats[0].value.replace(/\D/g, '') || 0), 0)

  return (
    <div
      className="flex items-center justify-center gap-8 py-4 mb-10 rounded-2xl flex-wrap"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {[
        { label: 'Total Experts', value: profiles.length },
        { label: 'Avg. Rating', value: `${avgRating}★` },
        { label: 'Combined Projects', value: `${totalProjects}+` },
        { label: 'Countries', value: '6' },
      ].map((item) => (
        <div key={item.label} className="text-center px-4">
          <p className="text-2xl font-bold gradient-text">{item.value}</p>
          <p className="text-xs text-white/40 mt-0.5">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

// ── Root App component ──────────────────────────────────────────────────────
function App() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'Design', 'Engineering', 'AI/ML', 'Security', 'Mobile', 'Cloud']

  const filtered = PROFILES.filter((p) => {
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Design' && p.role.includes('Design')) ||
      (activeFilter === 'Engineering' && p.role.includes('Engineer')) ||
      (activeFilter === 'AI/ML' && p.role.includes('AI')) ||
      (activeFilter === 'Security' && p.role.includes('Security')) ||
      (activeFilter === 'Mobile' && p.role.includes('Mobile')) ||
      (activeFilter === 'Cloud' && p.role.includes('Cloud'))

    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen hero-bg">
      {/* ── Hero Header ── */}
      <header className="text-center pt-16 pb-10 px-6">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
          style={{
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(124,58,237,0.3)',
            color: '#a78bfa',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          ReactJS · Props &amp; Hooks Demo
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
          Expert{' '}
          <span className="gradient-text">Profiles</span>
        </h1>
        <p className="text-white/40 text-base max-w-xl mx-auto">
          A reusable <code className="text-violet-400 bg-violet-400/10 px-1 rounded">Card</code> component
          that renders details from an array of objects passed as&nbsp;
          <code className="text-blue-400 bg-blue-400/10 px-1 rounded">props</code>.
          Cards feature gradient borders and interactive hooks.
        </p>

        {/* Search */}
        <div className="relative max-w-sm mx-auto mt-8">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none"
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, role, or skill…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {categories.map((cat) => (
            <FilterButton
              key={cat}
              label={cat}
              active={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
            />
          ))}
        </div>
      </header>

      {/* ── Summary Bar ── */}
      <div className="max-w-6xl mx-auto px-6">
        <SummaryBar profiles={PROFILES} />
      </div>

      {/* ── Cards Grid ── */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-white/40 text-sm">No experts match your search.</p>
            <button
              className="mt-4 text-violet-400 text-sm underline cursor-pointer"
              onClick={() => { setSearchQuery(''); setActiveFilter('All') }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((profile) => (
              <Card
                key={profile.id}
                id={profile.id}
                avatar={profile.avatar}
                name={profile.name}
                role={profile.role}
                company={profile.company}
                location={profile.location}
                rating={profile.rating}
                bio={profile.bio}
                skills={profile.skills}
                stats={profile.stats}
                gradientColors={profile.gradientColors}
                delay={profile.delay}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="text-center pb-8">
        <p className="text-white/20 text-xs">
          Built with <span className="text-violet-400">React Hooks &amp; Props</span> · TailwindCSS · Vite
        </p>
      </footer>
    </div>
  )
}

export default App
