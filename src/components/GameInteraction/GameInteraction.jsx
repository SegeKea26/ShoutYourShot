import React, { useState } from 'react'

function GameInteraction({ onThrow = () => {}, onMiss = () => {}, onUndo = () => {} }) {
  const [selectedScore, setSelectedScore] = useState('1')
  const [selectedMultiplier, setSelectedMultiplier] = useState(1)

  const isBullScore = selectedScore === '25' || selectedScore === '50'

  // If a bull score is selected, ensure multiplier is reset — handled in select change handler

  function toggleDouble() {
    if (isBullScore) return
    setSelectedMultiplier(prev => (prev === 2 ? 1 : 2))
  }

  function toggleTriple() {
    if (isBullScore) return
    setSelectedMultiplier(prev => (prev === 3 ? 1 : 3))
  }

  function handleThrow() {
    const numericScore = Number(selectedScore)
    if (!Number.isFinite(numericScore) || numericScore <= 0) return
    onThrow(numericScore, selectedMultiplier)
    setSelectedScore('1')
    setSelectedMultiplier(1)
  }

  return (
    <div className="game-interaction">
      <div className="game-interaction__header">
        <button type="button" onClick={toggleDouble} aria-pressed={selectedMultiplier === 2} disabled={isBullScore}>Double</button>
        <button type="button" onClick={toggleTriple} aria-pressed={selectedMultiplier === 3} disabled={isBullScore}>Triple</button>
        <button type="button" onClick={() => onUndo && onUndo()}>Undo</button>
        <button type="button" onClick={() => onMiss && onMiss()}>Miss</button>
      </div>
      <div className="game-interaction__content">
        <select value={selectedScore} onChange={e => {
          const newValue = e.target.value
          setSelectedScore(newValue)
          if ((newValue === '25' || newValue === '50') && selectedMultiplier !== 1) {
            setSelectedMultiplier(1)
          }
        }}>
          {Array.from({ length: 20 }, (_, i) => (
            <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
          ))}
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <button type="button" onClick={handleThrow}>Throw</button>
      </div>

    </div>
  )
}

export default GameInteraction