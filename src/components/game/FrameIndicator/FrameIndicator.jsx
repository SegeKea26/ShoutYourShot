import './FrameIndicator.css'

function FrameIndicator({ currentLeg, totalLegs, className = '' }) {
    return (
        <div className={`frame-indicator ${className}`.trim()}>
            <span className="frame-indicator__label">Frame</span>
            <span className="frame-indicator__current">{currentLeg}</span>
            <span className="frame-indicator__separator">/</span>
            <span className="frame-indicator__total">{totalLegs}</span>
        </div>
    )
}

export default FrameIndicator
