import './CheckoutRecommender.css'

import { useCheckoutRecommendation } from '../../../hooks/game/useCheckoutRecommendation'

function CheckoutRecommender({ currentScore, className = '' }) {
    const { canCheckout, displayText } = useCheckoutRecommendation(currentScore)

    return (
        <div className={`checkout-recommender ${className}`.trim()}>
            {canCheckout ? (
                <p className="checkout-recommender__text">{displayText}</p>
            ) : (
                <p className="checkout-recommender__placeholder">&nbsp;</p>
            )}
        </div>
    )
}

export default CheckoutRecommender
