import './MultiplierButton.css'

function MultiplierButton({
    multiplier,
    currentMultiplier,
    disabled = false,
    onClick,
    className = ''
}) {
    const isActive = currentMultiplier === multiplier
    const label = multiplier === 2 ? 'Double' : 'Triple'

    const buttonClass = [
        'multiplier-button',
        isActive ? 'multiplier-button--active' : '',
        disabled ? 'multiplier-button--disabled' : '',
        className
    ].filter(Boolean).join(' ')

    return (
        <button
            type="button"
            className={buttonClass}
            onClick={onClick}
            aria-pressed={isActive}
            disabled={disabled}
        >
            <span className="multiplier-button__label">{label}</span>
        </button>
    )
}

export default MultiplierButton
