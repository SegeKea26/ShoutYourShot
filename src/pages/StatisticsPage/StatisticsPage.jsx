import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { validateGamePresence } from '../../hooks/setup/useValidationManager'

function StatisticsPage() {
    const navigate = useNavigate()

    useEffect(() => {
        validateGamePresence(navigate)
    }, [navigate])
    return (
        <div>StatisticsPage</div>
    )
}

export default StatisticsPage