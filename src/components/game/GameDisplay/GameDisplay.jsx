import './GameDisplay.css'

import PlayerCard from '../PlayerCard/PlayerCard'
import FrameIndicator from '../FrameIndicator/FrameIndicator'
import AchievementList from '../AchievementList/AchievementList'
import GameInteraction from '../GameInteraction/GameInteraction'

function GameDisplayHeader({ currentLeg, totalLegs }) {
    return (
        <header className="game-display__header">
            <FrameIndicator
                currentLeg={currentLeg}
                totalLegs={totalLegs}
                className="game-display__frame-indicator"
            />
        </header>
    )
}

function GameDisplayPlayers({ players, legs, currentLeg, activeIndex, startPoints }) {
    const legIndex = (currentLeg || 1) - 1
    const legPlayers = (legs && legs[legIndex] && legs[legIndex].players) || []
    const legHistory = (legs && legs[legIndex] && legs[legIndex].history) || []

    // Calculate legs won per player
    const legsWonPerPlayer = players.map((_, playerIndex) => {
        return legs.filter(leg => leg.winner === playerIndex).length
    })

    // Extract last 3 throws per player from history
    const throwHistoryPerPlayer = players.map((_, playerIndex) => {
        return legHistory
            .filter(entry => entry.playerIndex === playerIndex)
            .slice(-3)
    })

    return (
        <div className="game-display__players">
            {players.map((player, index) => (
                <PlayerCard
                    key={index}
                    player={player}
                    playerIndex={index}
                    startPoints={startPoints}
                    achievements={(legPlayers[index] && legPlayers[index].achievements) || []}
                    throwHistory={throwHistoryPerPlayer[index] || []}
                    legsWon={legsWonPerPlayer[index] || 0}
                    isActive={activeIndex === index}
                    className="game-display__player-card"
                />
            ))}
        </div>
    )
}

function GameDisplayInteraction({ onThrow, onMiss, onUndo }) {
    return (
        <div className="game-display__interaction">
            <GameInteraction
                onThrow={onThrow}
                onMiss={onMiss}
                onUndo={onUndo}
            />
        </div>
    )
}

function GameDisplay({
    gameStorage,
    onThrow = () => { },
    onMiss = () => { },
    onUndo = () => { }
}) {
    const activeIndex = gameStorage && typeof gameStorage.activePlayerIndex === 'number'
        ? gameStorage.activePlayerIndex
        : 0

    const currentLeg = gameStorage && typeof gameStorage.currentLeg === 'number'
        ? gameStorage.currentLeg
        : 1

    const totalLegs = gameStorage && typeof gameStorage.totalLegs === 'number'
        ? gameStorage.totalLegs
        : (gameStorage && gameStorage.totalLegs) || 1

    const players = (gameStorage && gameStorage.players) || []
    const achievements = (gameStorage && gameStorage.achievements) || []
    const legs = (gameStorage && gameStorage.legs) || []
    const startPoints = (gameStorage && gameStorage.startPoints) || 0

    return (
        <section className="game-display">
            <GameDisplayHeader
                currentLeg={currentLeg}
                totalLegs={totalLegs}
            />

            <div className="game-display__body">
                <GameDisplayPlayers
                    players={players}
                    legs={legs}
                    currentLeg={currentLeg}
                    activeIndex={activeIndex}
                    startPoints={startPoints}
                />
            </div>

            <GameDisplayInteraction
                onThrow={onThrow}
                onMiss={onMiss}
                onUndo={onUndo}
            />
        </section>
    )
}

export default GameDisplay
