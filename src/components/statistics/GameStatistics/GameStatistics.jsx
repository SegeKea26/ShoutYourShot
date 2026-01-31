import './GameStatistics.css'

import { useGame } from '../../../hooks/context/useGameContext'
import { computeGameStatistics } from '../../../hooks/statistics/useStatisticsManager'
import { getRawStorage } from '../../../hooks/storage/useStorageManager'
import PlayerStatistics from '../PlayerStatistics/PlayerStatistics'

function formatName(s) {
    return typeof s === 'string'
        ? s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : s
}

function StatItem({ label, value }) {
    return (
        <div className="game-statistics__item">
            <span className="game-statistics__label">{label}</span>
            <span className="game-statistics__value">{value}</span>
        </div>
    )
}

function GameStatistics() {
    const { gameStorage } = useGame()
    const raw = getRawStorage()
    const stats = computeGameStatistics(raw)

    const achievementNames = stats.gameAchievements && stats.gameAchievements.length > 0
        ? stats.gameAchievements.map(a => formatName(a.name || a.key)).join(', ')
        : '—'

    return (
        <section className="game-statistics">
            <h2 className="game-statistics__title">Game Overview</h2>

            <div className="game-statistics__grid">
                <StatItem label="Winner" value={stats.winnerName || '—'} />
                <StatItem label="Points" value={stats.selectedTotalPoints || '—'} />
                <StatItem label="Legs" value={`${stats.legsPlayed} / ${stats.totalLegs || '—'}`} />
                <StatItem label="Outshot" value={stats.outshot} />
                <StatItem label="Total Busts" value={stats.totalBusts} />
                <StatItem label="Total 180s" value={stats.total180s} />
            </div>

            {stats.gameAchievements && stats.gameAchievements.length > 0 && (
                <div className="game-statistics__achievements">
                    <span className="game-statistics__label">Achievements</span>
                    <span className="game-statistics__value">{achievementNames}</span>
                </div>
            )}

            <h3 className="game-statistics__subtitle">Players</h3>
            <div className="game-statistics__players">
                {stats.playerStatistics.map(p => (
                    <PlayerStatistics key={p.index} stats={p} />
                ))}
            </div>
        </section>
    )
}

export default GameStatistics
