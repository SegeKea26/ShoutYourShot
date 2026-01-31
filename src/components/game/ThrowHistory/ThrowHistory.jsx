import './ThrowHistory.css'

/**
 * Format a throw entry for display
 * @param {object} entry - { value, multiplier, result }
 * @returns {string} Formatted throw string
 */
function formatThrow(entry) {
    if (!entry) return ''

    // Miss
    if (entry.result === 'miss' || entry.value === 0) {
        return 'M'
    }

    // Bull (50)
    if (entry.value === 50) {
        return 'BULL'
    }

    // Single 25
    if (entry.value === 25) {
        return '25'
    }

    // Double
    if (entry.multiplier === 2) {
        return `D${entry.value / 2}`
    }

    // Triple
    if (entry.multiplier === 3) {
        return `T${entry.value / 3}`
    }

    // Single
    return `${entry.value}`
}

function ThrowHistory({ throws = [], className = '' }) {
    if (!throws || throws.length === 0) {
        return null
    }

    const containerClass = [
        'throw-history',
        className
    ].filter(Boolean).join(' ')

    return (
        <div className={containerClass}>
            {throws.map((entry, index) => (
                <span
                    key={index}
                    className="throw-history__item"
                >
                    {formatThrow(entry)}
                </span>
            ))}
        </div>
    )
}

export default ThrowHistory
