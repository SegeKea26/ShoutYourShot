import React from 'react'

function PlayerDisplayHeader({ player, gameStorage, index }) {
  return (
    <div className="player-display__header">
      <h3 className="player-display__name">{player.name}</h3>
      <span className="player-display__points" id={`player-${index}-points`}>{typeof player.points === 'number' ? player.points : gameStorage.startPoints}</span>
    </div>
  )
}

function PlayerDisplayBody({ achievements = [] }) {
  return (
    <div className="player-display__content">
      {achievements && achievements.length > 0 && (
        <div className="player-achievements">
          {achievements.map(a => (
            <div key={a.key} className="player-achievement">
              <div className="achievement-name">{typeof a.name === 'string' ? a.name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : a.name}</div>
              {a.details && Object.keys(a.details).length > 0 && (
                <div className="achievement-details">{Object.entries(a.details).filter(([k]) => k !== 'playerIndex').map(([k,v]) => `${k}: ${v}`).join(' • ')}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PlayerDisplay({ player, gameStorage, index, active = false, achievements = [] }) {
  const className = `player-display ${active ? 'player-display--active' : ''}`

  return (
    <article className={className}>
      <PlayerDisplayHeader player={player} gameStorage={gameStorage} index={index} active={active} />
      <PlayerDisplayBody achievements={achievements} />
    </article>
  )
}

export default PlayerDisplay