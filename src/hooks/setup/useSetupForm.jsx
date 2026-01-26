import { useState, useRef } from 'react'
import { validateName } from './useValidationManager'
import { useGame } from '../context/useGameContext'

export function useSetupForm({ onNext } = {}) {
    const [errors, setErrors] = useState({})
    const firstErrorRef = useRef(null)
    const { addSetupToStorage } = useGame()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const entries = Array.from(formData.entries())
        const newErrors = {}

        for (const [name, value] of entries) {
            if (/^player/i.test(name)) {
                const err = validateName(value)
                if (err) newErrors[name] = err
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            firstErrorRef.current = Object.keys(newErrors)[0]
            return
        }

        setErrors({})

        for (const [name, value] of entries) {
            addSetupToStorage(name, value)
        }

        if (onNext) onNext()
    }

    return { errors, firstErrorRef, handleSubmit, setErrors }
}

export default useSetupForm
