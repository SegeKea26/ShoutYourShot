import './AchievementBadge.css'

function formatAchievementName(name) {
    if (typeof name !== 'string') return name
    return name
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
}

function AchievementBadge({ achievement, variant = 'default', className = '' }) {
    const { name, details } = achievement

    const badgeClass = [
        'achievement-badge',
        `achievement-badge--${variant}`,
        className
    ].filter(Boolean).join(' ')

    const filteredDetails = details
        ? Object.entries(details).filter(([key]) => key !== 'playerIndex')
        : []

    return (
        <div className={badgeClass}>
            <span className="achievement-badge__name">
                {formatAchievementName(name)}
            </span>
            {filteredDetails.length > 0 && (
                <span className="achievement-badge__details">
                    {filteredDetails.map(([key, value]) => (
                        <span key={key} className="achievement-badge__detail">
                            <span className="achievement-badge__detail-key">{key}</span>
                            <span className="achievement-badge__detail-value">{value}</span>
                        </span>
                    ))}
                </span>
            )}
        </div>
    )
}

export default AchievementBadge
