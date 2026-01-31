import './StatisticsPage.css'

import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { validateGamePresence } from '../../hooks/setup/useValidationManager'
import { useGame } from '../../hooks/context/useGameContext'

import Header from '../../components/general/Header/Header'
import Footer from '../../components/general/Footer/Footer'
import GameStatistics from '../../components/statistics/GameStatistics/GameStatistics'
import LegStatistics from '../../components/statistics/LegStatistics/LegStatistics'

function StatisticsPage() {
    const navigate = useNavigate()
    const { gameStorage } = useGame()

    useEffect(() => {
        validateGamePresence(navigate)
    }, [navigate])

    // Enable scrolling only on statistics page (no visible scrollbar)
    useEffect(() => {
        document.body.style.overflow = 'auto'
        document.body.style.scrollbarWidth = 'none'
        document.getElementById('root').style.overflow = 'auto'
        document.getElementById('root').style.scrollbarWidth = 'none'

        return () => {
            document.body.style.overflow = 'hidden'
            document.body.style.scrollbarWidth = ''
            document.getElementById('root').style.overflow = 'hidden'
            document.getElementById('root').style.scrollbarWidth = ''
        }
    }, [])

    const legs = (gameStorage && gameStorage.legs) || []

    return (
        <>
            <Header />
            <main className="statistics-page">
                <section className="statistics-page__header">
                    <h1 className="statistics-page__title">Statistics</h1>
                    <button
                        className="statistics-page__back"
                        onClick={() => navigate('/')}
                    >
                        New Game
                    </button>
                </section>

                <GameStatistics />

                <section className="statistics-page__legs">
                    <h2 className="statistics-page__section-title">Legs</h2>
                    <div className="statistics-page__legs-list">
                        {legs.map((_, i) => (
                            <LegStatistics key={i} legIndex={i} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default StatisticsPage