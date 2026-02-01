import './StatisticsPage.css'

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { validateGamePresence } from '../../hooks/setup/useValidationManager'
import { useGame } from '../../hooks/context/useGameContext'
import { usePdfExport } from '../../hooks/usePdfExport'

import Header from '../../components/general/Header/Header'
import Footer from '../../components/general/Footer/Footer'
import GameStatistics from '../../components/statistics/GameStatistics/GameStatistics'
import LegStatistics from '../../components/statistics/LegStatistics/LegStatistics'

function StatisticsPage() {
    const navigate = useNavigate()
    const { gameStorage } = useGame()
    const contentRef = useRef(null)
    const { exportToPdf, isExporting } = usePdfExport()
    const [allLegsOpen, setAllLegsOpen] = useState(false)

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

    const handleDownloadPdf = async () => {
        // First expand all legs for PDF capture
        setAllLegsOpen(true)

        // Wait for state to update and DOM to render
        setTimeout(async () => {
            await exportToPdf(contentRef.current)
            setAllLegsOpen(false)
        }, 100)
    }

    return (
        <>
            <Header />
            <main className="statistics-page" ref={contentRef}>
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
                            <LegStatistics key={i} legIndex={i} forceOpen={allLegsOpen} />
                        ))}
                    </div>
                </section>

                <section className="statistics-page__actions">
                    <button
                        className="statistics-page__download"
                        onClick={handleDownloadPdf}
                        disabled={isExporting}
                    >
                        {isExporting ? 'Generating...' : 'Download PDF'}
                    </button>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default StatisticsPage