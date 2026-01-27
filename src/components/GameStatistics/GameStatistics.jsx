import React from 'react'
import { useGame } from '../../hooks/context/useGameContext'
import { computeGameStatistics } from '../../hooks/statistics/useStatisticsManager'
import { getRawStorage } from '../../hooks/storage/useStorageManager'
import PlayerStatistics from '../PlayerStatistics/PlayerStatistics'

export default function GameStatistics() {
  const { gameStorage } = useGame()
  const raw = getRawStorage()
  const stats = computeGameStatistics(raw)

  const formatName = (s) => (typeof s === 'string' ? s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : s)

  return (
    <section>
      <h2>Game Statistics</h2>
      <div>Winner: {stats.winnerName || '—'}</div>
      <div>Selected total points: {stats.selectedTotalPoints || '—'}</div>
      <div>Legs: {stats.legsPlayed} / {stats.totalLegs || '—'}</div>
      <div>Outshot mode: {stats.outshot}</div>
      <div>Total busts: {stats.totalBusts}</div>
      <div>Total 180s: {stats.total180s}</div>
      <div>Game achievements: {stats.gameAchievements && stats.gameAchievements.length > 0 ? stats.gameAchievements.map(a=>formatName(a.name || a.key)).join(', ') : '—'}</div>

      <h3>Players</h3>
      {stats.playerStatistics.map(p => (
        <PlayerStatistics key={p.index} stats={p} />
      ))}
    </section>
  )
}
