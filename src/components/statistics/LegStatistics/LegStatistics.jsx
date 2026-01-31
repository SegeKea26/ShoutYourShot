import './LegStatistics.css'

import { useState } from 'react'
import { computeLegStatistics } from '../../../hooks/statistics/useStatisticsManager'
import { useGame } from '../../../hooks/context/useGameContext'
import PlayerStatistics from '../PlayerStatistics/PlayerStatistics'

function formatName(s) {
    return typeof s === 'string'
        ? s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : s
}

function LegStatistics({ legIndex = 0 }) {
    const [isOpen, setIsOpen] = useState(false)
    const { gameStorage } = useGame()
    const leg = (gameStorage && gameStorage.legs && gameStorage.legs[legIndex]) || {}
    const stats = computeLegStatistics(leg, gameStorage)

    const winnerName = (stats.winnerIndex !== null && gameStorage.players && gameStorage.players[stats.winnerIndex])
        ? gameStorage.players[stats.winnerIndex].name
        : '—'

    const legPlayers = (leg && leg.players) || []
    const legAchievements = []

    legPlayers.forEach(pl => {
        (pl && pl.achievements || []).forEach(a => {
            if (!legAchievements.find(x => x.key === a.key)) legAchievements.push(a)
        })
    })

    return (
        <article className="leg-statistics">
            <button
                className="leg-statistics__header"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="leg-statistics__title">Leg {legIndex + 1}</span>
                <span className="leg-statistics__winner">{winnerName}</span>
                <span className="leg-statistics__toggle">{isOpen ? '−' : '+'}</span>
            </button>

            {isOpen && (
                <div className="leg-statistics__content">
                    <div className="leg-statistics__stats">
                        <div className="leg-statistics__stat">
                            <span className="leg-statistics__label">Busts</span>
                            <span className="leg-statistics__value">{stats.busts}</span>
                        </div>
                        <div className="leg-statistics__stat">
                            <span className="leg-statistics__label">180s</span>
                            <span className="leg-statistics__value">{stats.leg180s}</span>
                        </div>
                    </div>

                    {legAchievements.length > 0 && (
                        <div className="leg-statistics__achievements">
                            {legAchievements.map((a, i) => (
                                <span key={a.key || `${i}`} className="leg-statistics__achievement">
                                    {formatName(a.name)}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="leg-statistics__players">
                        {stats.playerStatistics.map(p => {
                            const playerAchievements = (legPlayers[p.index] && legPlayers[p.index].achievements) || []
                            return (
                                <PlayerStatistics
                                    key={p.index}
                                    stats={p}
                                    showScoreTotal={false}
                                    showLegsWon={false}
                                    achievements={playerAchievements}
                                />
                            )
                        })}
                    </div>
                </div>
            )}
        </article>
    )
}

export default LegStatistics
