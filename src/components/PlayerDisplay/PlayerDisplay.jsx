import React from 'react'

function PlayerDisplayHeader({ player, gameStorage, index }) {
  return (
    <div className="player-display__header">
      <h3 className="player-display__name">{player.name}</h3>
      <span className="player-display__points" id={`player-${index}-points`}>{typeof player.points === 'number' ? player.points : gameStorage.startPoints}</span>
    </div>
  )
}

function PlayerDisplayBody() {
  return (
    <div className="player-display__content">
      {/* Additional player/throw details */}
    </div>
  )
}

function PlayerDisplay({ player, gameStorage, index, active = false }) {
  const className = `player-display ${active ? 'player-display--active' : ''}`

  return (
    <article className={className}>
      <PlayerDisplayHeader player={player} gameStorage={gameStorage} index={index} active={active} />
      <PlayerDisplayBody />
    </article>
  )
}

export default PlayerDisplay