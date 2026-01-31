import './GameActionButton.css'

function GameActionButton({
    label,
    onClick,
    variant = 'default',
    disabled = false,
    type = 'button',
    className = ''
}) {
    const buttonClass = [
        'game-action-button',
        `game-action-button--${variant}`,
        disabled ? 'game-action-button--disabled' : '',
        className
    ].filter(Boolean).join(' ')

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
        >
            <span className="game-action-button__label">{label}</span>
        </button>
    )
}

export default GameActionButton
