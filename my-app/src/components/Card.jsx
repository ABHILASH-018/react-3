import { useState } from 'react'

// ── Avatar / Icon display ───────────────────────────────────────────────────
function CardAvatar({ avatar, name }) {
  return (
    <div className="relative flex-shrink-0">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(37,99,235,0.3))',
          border: '1px solid rgba(167,139,250,0.3)',
        }}
      >
        {avatar}
      </div>
      <span
        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
        style={{ background: '#22c55e', borderColor: '#0a0a0f' }}
      />
    </div>
  )
}

// ── Rating stars ────────────────────────────────────────────────────────────
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-3.5 h-3.5"
          viewBox="0 0 20 20"
          fill={star <= Math.round(rating) ? '#f59e0b' : 'rgba(255,255,255,0.15)'}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
      <span className="text-xs text-white/50 ml-1">{rating}</span>
    </div>
  )
}

// ── Skill tags list ─────────────────────────────────────────────────────────
function SkillList({ skills }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {skills.map((skill) => (
        <span key={skill} className="skill-tag">
          {skill}
        </span>
      ))}
    </div>
  )
}

// ── Progress bar ────────────────────────────────────────────────────────────
function ProgressBar({ label, value, color }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs font-semibold text-white/80">{value}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-1.5 rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  )
}

// ── Action buttons ──────────────────────────────────────────────────────────
function CardActions({ onLike, liked, onBookmark, bookmarked }) {
  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={onLike}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
        style={{
          background: liked ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${liked ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)'}`,
          color: liked ? '#f87171' : 'rgba(255,255,255,0.5)',
        }}
      >
        <svg className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {liked ? 'Liked' : 'Like'}
      </button>

      <button
        onClick={onBookmark}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
        style={{
          background: bookmarked ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${bookmarked ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.1)'}`,
          color: bookmarked ? '#fbbf24' : 'rgba(255,255,255,0.5)',
        }}
      >
        <svg className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        {bookmarked ? 'Saved' : 'Save'}
      </button>

      <button
        className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
          color: 'white',
          border: 'none',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        View Profile
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  )
}

// ── Main Card component (receives all data via props) ───────────────────────
function Card({ id, avatar, name, role, company, location, rating, bio, skills, stats, gradientColors, delay }) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const gradient = gradientColors || ['#7c3aed', '#2563eb', '#059669']

  return (
    <div
      className="gradient-border-card"
      style={{
        animationDelay: `${delay || 0}s`,
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]}, ${gradient[2] || gradient[1]})`,
      }}
    >
      <div className="card-inner p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <CardAvatar avatar={avatar} name={name} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-white font-bold text-base truncate">{name}</h3>
              <span
                className="badge text-xs"
                style={{
                  background: `linear-gradient(135deg, ${gradient[0]}30, ${gradient[1]}30)`,
                  border: `1px solid ${gradient[0]}50`,
                  color: gradient[0],
                }}
              >
                Pro
              </span>
            </div>
            <p className="text-sm font-medium mt-0.5" style={{ color: gradient[0] }}>
              {role}
            </p>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-xs text-white/40 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {company}
              </span>
              <span className="text-xs text-white/40 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <StarRating rating={rating} />

        {/* Bio */}
        <p
          className="text-xs text-white/50 mt-3 leading-relaxed cursor-pointer select-none"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? bio : `${bio.slice(0, 90)}${bio.length > 90 ? '...' : ''}`}
          {bio.length > 90 && (
            <span className="ml-1 text-violet-400 font-medium">
              {expanded ? 'less' : 'more'}
            </span>
          )}
        </p>

        {/* Skills */}
        <SkillList skills={skills} />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {stats.map((s) => (
            <div key={s.label} className="stat-box">
              <p className="text-sm font-bold text-white">{s.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Progress bars */}
        <div className="mt-4">
          <ProgressBar label="Projects Done" value={82} color={`linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`} />
          <ProgressBar label="Client Satisfaction" value={95} color={`linear-gradient(90deg, ${gradient[1]}, ${gradient[2] || gradient[1]})`} />
        </div>

        {/* Actions – uses useState hooks, passed as callbacks */}
        <CardActions
          liked={liked}
          onLike={() => setLiked((prev) => !prev)}
          bookmarked={bookmarked}
          onBookmark={() => setBookmarked((prev) => !prev)}
        />
      </div>
    </div>
  )
}

export default Card
