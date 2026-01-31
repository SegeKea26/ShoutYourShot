import { useGame } from '../../hooks/context/useGameContext'
import { useVoiceMode } from '../../hooks/game/voice/useVoiceMode'
import WinModal from '../../components/game/WinModal/WinModal'
import Header from '../../components/general/Header/Header'
import VoiceModeButton from '../../components/game/VoiceModeButton/VoiceModeButton'
import GameDisplay from '../../components/game/GameDisplay/GameDisplay'

function GamePage() {
    const { gameStorage, handleThrow, handleMiss, handleUndo, winnerModalVisible, winnerName } = useGame()

    const { isListening, isSupported, toggle } = useVoiceMode({
        onThrow: handleThrow,
        onMiss: handleMiss,
        onUndo: handleUndo
    })

    return (
        <>
            <Header rightContent={
                <VoiceModeButton
                    isListening={isListening}
                    isSupported={isSupported}
                    onToggle={toggle}
                />
            } />
            <main style={{ paddingBottom: 'var(--space-lg)' }}>
                <GameDisplay
                    gameStorage={gameStorage}
                    onThrow={handleThrow}
                    onMiss={handleMiss}
                    onUndo={handleUndo}
                />
            </main>
            <WinModal visible={winnerModalVisible} playerName={winnerName} />
        </>
    )
}

export default GamePage