import { useEffect, useCallback, useRef, useState } from 'react'
import { parseVoiceCommand } from './parseVoiceCommand'

/**
 * Custom voice hook using native Web Speech API
 * Uses refs for handlers to prevent recreation loops
 */
export function useVoiceMode({ onThrow, onMiss, onUndo }) {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState('')
    const recognitionRef = useRef(null)
    const isListeningRef = useRef(false)

    // Store handlers in refs to avoid dependency issues
    const handlersRef = useRef({ onThrow, onMiss, onUndo })
    handlersRef.current = { onThrow, onMiss, onUndo }

    // State for duplicate prevention
    const stateRef = useRef({
        processing: false,
        lastCommand: '',
        lastTime: 0
    })

    // Check browser support
    const isSupported = typeof window !== 'undefined' &&
        ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)

    // Initialize recognition ONCE
    useEffect(() => {
        if (!isSupported) return

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()

        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'nl-NL'
        recognition.maxAlternatives = 1

        recognition.onresult = (event) => {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i]
                const text = result[0].transcript.trim()
                const isFinal = result.isFinal
                const state = stateRef.current

                console.log('[Voice]', isFinal ? 'FINAL:' : 'INTERIM:', text)
                setTranscript(text)

                // Only execute on FINAL results to prevent double execution
                if (!isFinal) continue

                // Skip if already processing
                if (state.processing || !text) continue

                const command = parseVoiceCommand(text)
                if (!command) continue

                const commandKey = `${command.type}-${command.score || 0}-${command.multiplier || 1}`
                const now = Date.now()

                // Skip duplicate within 1.2 seconds
                if (commandKey === state.lastCommand && (now - state.lastTime) < 1200) {
                    console.log('[Voice] BLOCKED:', commandKey)
                    continue
                }

                // Execute!
                state.processing = true
                state.lastCommand = commandKey
                state.lastTime = now

                console.log('[Voice] EXECUTING:', command)

                const handlers = handlersRef.current
                switch (command.type) {
                    case 'throw':
                        handlers.onThrow?.(command.score, command.multiplier)
                        break
                    case 'miss':
                        handlers.onMiss?.()
                        break
                    case 'undo':
                        handlers.onUndo?.()
                        break
                }

                setTranscript('')

                setTimeout(() => {
                    state.processing = false
                }, 500)
            }
        }

        recognition.onerror = (event) => {
            console.error('[Voice] Error:', event.error)
            if (event.error !== 'no-speech' && event.error !== 'aborted') {
                setIsListening(false)
                isListeningRef.current = false
            }
        }

        recognition.onend = () => {
            // Auto-restart if supposed to be listening
            if (isListeningRef.current) {
                try {
                    recognition.start()
                } catch (e) { }
            }
        }

        recognitionRef.current = recognition

        return () => {
            recognition.stop()
            recognitionRef.current = null
        }
    }, [isSupported]) // Only depend on isSupported!

    // Toggle
    const toggle = useCallback(() => {
        const recognition = recognitionRef.current
        if (!recognition) return

        if (isListening) {
            recognition.stop()
            setIsListening(false)
            isListeningRef.current = false
            setTranscript('')
        } else {
            stateRef.current = { processing: false, lastCommand: '', lastTime: 0 }
            try {
                recognition.start()
                setIsListening(true)
                isListeningRef.current = true
            } catch (e) {
                console.error('[Voice] Start error:', e)
            }
        }
    }, [isListening])

    return {
        isListening,
        isSupported,
        toggle,
        transcript
    }
}
