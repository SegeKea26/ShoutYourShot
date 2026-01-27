import React, { useEffect, useState, useRef } from 'react'
import { useGame } from '../../hooks/context/useGameContext'

function AchievementBanner({ achievement, onClose }) {
  if (!achievement) return null
  return (
    <div className="achievement-banner" onClick={onClose}>
      <strong>{typeof achievement.name === 'string' ? achievement.name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : achievement.name}</strong>
      <div className="achievement-details">{achievement.details && JSON.stringify(achievement.details)}</div>
    </div>
  )
}

export default function Achievement() {
  const { gameStorage } = useGame()
  const [visible, setVisible] = useState(null)
  const lastLen = useRef(0)

  useEffect(() => {
    // detect newest achievement across legs and players
    const legs = (gameStorage && gameStorage.legs) || []
    const flat = legs.reduce((acc, leg, legIdx) => {
      const players = (leg && leg.players) || []
      players.forEach((p, idx) => {
        const list = (p && p.achievements) || []
        list.forEach(a => acc.push({ ...a, owner: idx, leg: legIdx }))
      })
      return acc
    }, [])
    if (flat.length > lastLen.current) {
      const newest = flat[flat.length - 1]
      setVisible(newest)
      lastLen.current = flat.length
      const t = setTimeout(() => setVisible(null), 4000)
      return () => clearTimeout(t)
    }
    lastLen.current = flat.length
  }, [gameStorage])

  const list = (gameStorage && gameStorage.legs) ? gameStorage.legs.reduce((acc, leg, li) => acc.concat((leg.players || []).reduce((ac2, pl, pi) => ac2.concat((pl.achievements || []).map(a => ({ ...a, owner: pi, leg: li }))), [])), []) : []

  return (
    <div className="achievements-wrapper">
      <AchievementBanner achievement={visible} onClose={() => setVisible(null)} />
      <div className="achievements-list">
        {list.map(a => (
          <div key={a.key} className="achievement-item">
            <strong>{typeof a.name === 'string' ? a.name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : a.name}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
