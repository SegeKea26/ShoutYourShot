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
      {gameStorage && gameStorage.achievements && gameStorage.achievements.length > 0 && (
        <div className="game-display__achievements">
          {gameStorage.achievements.map(a => (
            <div key={a.key} className="game-achievement">
              <strong>{typeof a.name === 'string' ? a.name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : a.name}</strong>
            </div>
          ))}
        </div>
      )}
      <div className="game-display__players">
        {gameStorage && gameStorage.players && 
          (() => {
            const legIndex = (currentLeg || 1) - 1
            const legPlayers = (gameStorage.legs && gameStorage.legs[legIndex] && gameStorage.legs[legIndex].players) || []
            return gameStorage.players.map((player, index) => (
              <PlayerDisplay
                key={index}
                index={index}
                player={player}
                gameStorage={gameStorage}
                achievements={(legPlayers[index] && legPlayers[index].achievements) || []}
                active={activeIndex === index}
              />
            ))
          })()
        }
      </div>
    </div>
  )
}

export default GameDisplay