import './ScoreSelector.css'

import { useState, useRef, useEffect } from 'react'

function ScoreSelector({ value, onChange, className = '' }) {
    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef(null)

    const scores = [
        ...Array.from({ length: 20 }, (_, i) => i + 1),
        25,
        50
    ]

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = (score) => {
        onChange({ target: { value: String(score) } })
        setIsOpen(false)
    }

    return (
        <div ref={wrapperRef} className={`score-selector ${className}`.trim()}>
            <button
                type="button"
                className="score-selector__trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                {value}
            </button>

            {isOpen && (
                <div className="score-selector__dropdown">
                    {scores.map(score => (
                        <button
                            key={score}
                            type="button"
                            className={`score-selector__option ${value === String(score) ? 'score-selector__option--selected' : ''}`}
                            onClick={() => handleSelect(score)}
                        >
                            {score}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ScoreSelector
