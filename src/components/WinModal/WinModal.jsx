import React from 'react'

function WinModal({ visible = false, playerName = '' }) {
  if (!visible) return null

  return (
    <div className="win-modal" role="dialog" aria-live="polite">
      <div className="win-modal__backdrop" />
      <div className="win-modal__content">
        <h2>Congratulations!</h2>
        <p>{playerName} has won this frame</p>
      </div>
    </div>
  )
}

export default WinModal
