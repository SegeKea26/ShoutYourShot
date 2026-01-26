import { useGame } from '../../hooks/context/useGameContext'
import WinModal from '../../components/WinModal/WinModal'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import GameDisplay from '../../components/GameDisplay/GameDisplay'
import GameInteraction from '../../components/GameInteraction/GameInteraction'

function GamePage() {
    const { gameStorage, handleThrow, handleMiss, handleUndo, winnerModalVisible, winnerName } = useGame()

    return (
        <>
            <Header />
            <main>
                <GameDisplay gameStorage={gameStorage} />
                <GameInteraction onThrow={handleThrow} onMiss={handleMiss} onUndo={handleUndo} />
            </main>
            <WinModal visible={winnerModalVisible} playerName={winnerName} />
            <Footer />
        </>
    )
}

export default GamePage