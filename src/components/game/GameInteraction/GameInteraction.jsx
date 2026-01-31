import './GameInteraction.css'
import { useState } from 'react'
import ScoreSelector from '../ScoreSelector/ScoreSelector'
import MultiplierButton from '../MultiplierButton/MultiplierButton'
import GameActionButton from '../GameActionButton/GameActionButton'

function GameInteractionMultipliers({ selectedMultiplier, isBullScore, onToggleDouble, onToggleTriple }) {
    return (
        <div className="game-interaction__multipliers">
            <MultiplierButton
                multiplier={2}
                currentMultiplier={selectedMultiplier}
                disabled={isBullScore}
                onClick={onToggleDouble}
                className="game-interaction__multiplier-button"
            />
            <MultiplierButton
                multiplier={3}
                currentMultiplier={selectedMultiplier}
                disabled={isBullScore}
                onClick={onToggleTriple}
                className="game-interaction__multiplier-button"
            />
        </div>
    )
}

function GameInteractionActions({ onUndo, onMiss }) {
    return (
        <div className="game-interaction__actions">
            <GameActionButton
                label="Undo"
                variant="undo"
                onClick={onUndo}
                className="game-interaction__action-button"
            />
            <GameActionButton
                label="Miss"
                variant="miss"
                onClick={onMiss}
                className="game-interaction__action-button"
            />
        </div>
    )
}

function GameInteractionScoring({ selectedScore, onScoreChange, onThrow }) {
    return (
        <div className="game-interaction__scoring">
            <ScoreSelector
                value={selectedScore}
                onChange={onScoreChange}
                className="game-interaction__score-selector"
            />
            <GameActionButton
                label="Throw"
                variant="throw"
                onClick={onThrow}
                className="game-interaction__throw-button"
            />
        </div>
    )
}

function GameInteraction({
    onThrow = () => { },
    onMiss = () => { },
    onUndo = () => { }
}) {
    const [selectedScore, setSelectedScore] = useState('1')
    const [selectedMultiplier, setSelectedMultiplier] = useState(1)

    const isBullScore = selectedScore === '25' || selectedScore === '50'

    function toggleDouble() {
        if (isBullScore) return
        setSelectedMultiplier(prev => (prev === 2 ? 1 : 2))
    }

    function toggleTriple() {
        if (isBullScore) return
        setSelectedMultiplier(prev => (prev === 3 ? 1 : 3))
    }

    function handleScoreChange(e) {
        const newValue = e.target.value
        setSelectedScore(newValue)
        if ((newValue === '25' || newValue === '50') && selectedMultiplier !== 1) {
            setSelectedMultiplier(1)
        }
    }

    function handleThrow() {
        const numericScore = Number(selectedScore)
        if (!Number.isFinite(numericScore) || numericScore <= 0) return
        onThrow(numericScore, selectedMultiplier)
        setSelectedScore('1')
        setSelectedMultiplier(1)
    }

    return (
        <section className="game-interaction">
            <div className="game-interaction__header">
                <GameInteractionMultipliers
                    selectedMultiplier={selectedMultiplier}
                    isBullScore={isBullScore}
                    onToggleDouble={toggleDouble}
                    onToggleTriple={toggleTriple}
                />
                <GameInteractionActions
                    onUndo={onUndo}
                    onMiss={onMiss}
                />
            </div>
            <div className="game-interaction__content">
                <GameInteractionScoring
                    selectedScore={selectedScore}
                    onScoreChange={handleScoreChange}
                    onThrow={handleThrow}
                />
            </div>
        </section>
    )
}

export default GameInteraction
