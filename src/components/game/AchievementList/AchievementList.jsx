import './AchievementList.css'

import AchievementBadge from '../AchievementBadge/AchievementBadge'

function AchievementList({ achievements = [], variant = 'default', className = '' }) {
    if (!achievements || achievements.length === 0) {
        return null
    }

    const listClass = [
        'achievement-list',
        `achievement-list--${variant}`,
        className
    ].filter(Boolean).join(' ')

    return (
        <div className={listClass}>
            {achievements.map(achievement => (
                <AchievementBadge
                    key={achievement.key}
                    achievement={achievement}
                    variant={variant}
                    className="achievement-list__item"
                />
            ))}
        </div>
    )
}

export default AchievementList
