import './PlayerStatistics.css'

function formatName(s) {
    return typeof s === 'string'
        ? s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : s
}

function StatRow({ label, value }) {
    return (
        <div className="player-statistics__row">
            <span className="player-statistics__label">{label}</span>
            <span className="player-statistics__value">{value}</span>
        </div>
    )
}

function PlayerStatistics({ stats, showScoreTotal = true, showLegsWon = true, achievements = [] }) {
    if (!stats) return null

    return (
        <div className="player-statistics">
            <div className="player-statistics__header">
                <span className="player-statistics__name">{stats.name}</span>
            </div>

            <div className="player-statistics__body">
                <StatRow label="Busts" value={stats.busts} />
                <StatRow label="Darts" value={stats.darts} />
                {showScoreTotal && <StatRow label="Total" value={stats.scoreTotal} />}
                <StatRow label="180s" value={stats.visit180s} />
                {showLegsWon && <StatRow label="Legs" value={stats.legsWon || 0} />}
            </div>

            {achievements && achievements.length > 0 && (
                <div className="player-statistics__achievements">
                    {achievements.map((a, i) => (
                        <span key={a.key || `${a.name}-${i}`} className="player-statistics__achievement">
                            {formatName(a.name || a.key)}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PlayerStatistics
