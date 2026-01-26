import React from 'react'

import PlayerDisplay from '../PlayerDisplay/PlayerDisplay'

function GameDisplay({ gameStorage }) {
  const activeIndex = gameStorage && typeof gameStorage.activePlayerIndex === 'number'
    ? gameStorage.activePlayerIndex
    : 0

  const currentLeg = gameStorage && typeof gameStorage.currentLeg === 'number' ? gameStorage.currentLeg : 1
  const totalLegs = gameStorage && typeof gameStorage.totalLegs === 'number' ? gameStorage.totalLegs : (gameStorage && gameStorage.totalLegs) || 1

  return (
    <div className="game-display">
      <div className="game-display__frame">Frame {currentLeg} / {totalLegs}</div>
      <div className="game-display__players">
        {gameStorage && gameStorage.players && 
          gameStorage.players.map((player, index) => (
            <PlayerDisplay
              key={index}
              index={index}
              player={player}
              gameStorage={gameStorage}
              active={activeIndex === index}
            />
          ))
        }
      </div>
    </div>
  )
}

export default GameDisplay