import React from 'react'

export default function PlayerStatistics({ stats, showScoreTotal = true, showLegsWon = true, achievements = [] }) {
  if (!stats) return null
  const formatName = s => (typeof s === 'string' ? s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : s)
  return (
    <div className="player-stats">
      <div><strong>{stats.name}</strong></div>
      <div>Busts: {stats.busts}</div>
      <div>Darts thrown: {stats.darts}</div>
      {showScoreTotal && <div>Score total: {stats.scoreTotal}</div>}
      <div>180s (visits): {stats.visit180s}</div>
      {showLegsWon && <div>Legs won: {stats.legsWon || 0}</div>}

      {achievements && achievements.length > 0 && (
        <div className="player-achievements-stat">
          <div><strong>Achievements:</strong></div>
          <ul>
            {achievements.map((a, i) => (
              <li key={a.key || `${a.name}-${i}`}>{formatName(a.name || a.key)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
