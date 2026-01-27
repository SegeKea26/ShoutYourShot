import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { validateGamePresence } from '../../hooks/setup/useValidationManager'
import GameStatistics from '../../components/GameStatistics/GameStatistics'
import LegStatistics from '../../components/LegStatistics/LegStatistics'
import { useGame } from '../../hooks/context/useGameContext'

function StatisticsPage() {
    const navigate = useNavigate()

    useEffect(() => {
        validateGamePresence(navigate)
    }, [navigate])
    return (
        <div>
            <h1>Statistics</h1>
            <div>
              <button onClick={() => navigate('/')}>Back to Setup</button>
            </div>
            <GameStatistics />
            <h2>Legs</h2>
            <LegsList />
        </div>
    )
}

function LegsList() {
    const { gameStorage } = useGame()
    const legs = (gameStorage && gameStorage.legs) || []
    return (
        <div>
            {legs.map((_, i) => (
                <LegStatistics key={i} legIndex={i} />
            ))}
        </div>
    )
}

export default StatisticsPage