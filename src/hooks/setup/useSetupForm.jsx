import { useRef } from 'react'
import { validateName } from './useValidationManager'
import { useGame } from '../context/useGameContext'
import { useToast } from '../context/useToastContext'

export function useSetupForm({ onNext } = {}) {
    const firstErrorRef = useRef(null)
    const { addSetupToStorage } = useGame()
    const { addToast } = useToast()

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
            Object.values(newErrors).forEach(msg => {
                addToast(msg, 'error')
            })
            firstErrorRef.current = Object.keys(newErrors)[0]
            return
        }

        for (const [name, value] of entries) {
            addSetupToStorage(name, value)
        }

        if (onNext) onNext()
    }

    return { firstErrorRef, handleSubmit }
}

export default useSetupForm

