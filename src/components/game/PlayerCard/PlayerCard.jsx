import './PlayerCard.css'

import AchievementList from '../AchievementList/AchievementList'
import CheckoutRecommender from '../CheckoutRecommender/CheckoutRecommender'
import ThrowHistory from '../ThrowHistory/ThrowHistory'

function PlayerCardHeader({ name, legsWon }) {
    return (
        <header className="player-card__header">
            <h3 className="player-card__name">{name}</h3>
            <span className="player-card__legs">{legsWon} legs</span>
        </header>
    )
}

function PlayerCardBody({ points, achievements, throwHistory, playerIndex }) {
    return (
        <div className="player-card__body">
            <span className="player-card__points" id={`player-${playerIndex}-points`}>
                {points}
            </span>
            <CheckoutRecommender
                currentScore={points}
                className="player-card__checkout"
            />
            <ThrowHistory
                throws={throwHistory}
                className="player-card__throw-history"
            />
            <AchievementList
                achievements={achievements}
                variant="player"
                className="player-card__achievements"
            />
        </div>
    )
}

function PlayerCard({
    player,
    playerIndex,
    startPoints,
    achievements = [],
    throwHistory = [],
    legsWon = 0,
    isActive = false,
    className = ''
}) {
    const points = typeof player.points === 'number' ? player.points : startPoints

    const cardClass = [
        'player-card',
        isActive ? 'player-card--active' : '',
        className
    ].filter(Boolean).join(' ')

    return (
        <article className={cardClass}>
            <PlayerCardHeader
                name={player.name}
                legsWon={legsWon}
            />
            <PlayerCardBody
                points={points}
                achievements={achievements}
                throwHistory={throwHistory}
                playerIndex={playerIndex}
            />
        </article>
    )
}

export default PlayerCard
