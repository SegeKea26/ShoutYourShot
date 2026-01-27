import React from 'react'
import { computeLegStatistics } from '../../hooks/statistics/useStatisticsManager'
import { useGame } from '../../hooks/context/useGameContext'
import PlayerStatistics from '../PlayerStatistics/PlayerStatistics'

export default function LegStatistics({ legIndex = 0 }) {
  const { gameStorage } = useGame()
  const leg = (gameStorage && gameStorage.legs && gameStorage.legs[legIndex]) || {}
  const stats = computeLegStatistics(leg, gameStorage)

  const winnerName = (stats.winnerIndex !== null && gameStorage.players && gameStorage.players[stats.winnerIndex]) ? gameStorage.players[stats.winnerIndex].name : '—'

  return (
    <section>
      <h3>Leg {legIndex + 1}</h3>
      <div>Winner: {winnerName}</div>
      <div>Busts in leg: {stats.busts}</div>
      <div>180s in leg: {stats.leg180s}</div>

      {/* Leg-level achievements: aggregate from players' achievements in this leg */}
      {(() => {
        const legPlayers = (leg && leg.players) || []
        const legAchievements = []
        legPlayers.forEach(pl => {
          ;(pl && pl.achievements || []).forEach(a => {
            if (!legAchievements.find(x => x.key === a.key)) legAchievements.push(a)
          })
        })
        return legAchievements.length > 0 ? (
          <div>
            <h4>Leg Achievements</h4>
            <ul>
              {legAchievements.map((a,i) => <li key={a.key||`${i}`}>{typeof a.name === 'string' ? a.name.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase()) : a.name}</li>)}
            </ul>
          </div>
        ) : null
      })()}

      <h4>Players</h4>
      {stats.playerStatistics.map(p => {
        const legPlayers = (leg && leg.players) || []
        const playerAchievements = (legPlayers[p.index] && legPlayers[p.index].achievements) || []
        return (
          <PlayerStatistics key={p.index} stats={p} showScoreTotal={false} showLegsWon={false} achievements={playerAchievements} />
        )
      })}
    </section>
  )
}
