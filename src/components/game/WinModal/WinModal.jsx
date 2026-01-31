import './WinModal.css'

function WinModal({ visible = false, playerName = '' }) {
    if (!visible) return null

    return (
        <div className="win-modal" role="dialog" aria-live="polite">
            <div className="win-modal__backdrop" />
            <div className="win-modal__content">
                <h2 className="win-modal__title">Congratulations!</h2>
                <p className="win-modal__text">{playerName} has won this frame</p>
            </div>
        </div>
    )
}

export default WinModal
