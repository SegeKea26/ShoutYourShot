import { useState, useEffect, useCallback } from 'react'

/**
 * Hook to prevent screen from sleeping while app is active
 * Uses the Screen Wake Lock API
 */
export function useWakeLock() {
    const [isActive, setIsActive] = useState(false)
    const [isSupported, setIsSupported] = useState(false)
    const [wakeLock, setWakeLock] = useState(null)

    // Check if Wake Lock API is supported
    useEffect(() => {
        setIsSupported('wakeLock' in navigator)
    }, [])

    // Request wake lock
    const requestWakeLock = useCallback(async () => {
        if (!isSupported) return false

        try {
            const lock = await navigator.wakeLock.request('screen')
            setWakeLock(lock)
            setIsActive(true)

            // Re-acquire lock when page becomes visible again
            lock.addEventListener('release', () => {
                setIsActive(false)
                setWakeLock(null)
            })

            console.log('[WakeLock] Screen wake lock acquired')
            return true
        } catch (err) {
            console.error('[WakeLock] Failed to acquire:', err)
            return false
        }
    }, [isSupported])

    // Release wake lock
    const releaseWakeLock = useCallback(async () => {
        if (wakeLock) {
            await wakeLock.release()
            setWakeLock(null)
            setIsActive(false)
            console.log('[WakeLock] Screen wake lock released')
        }
    }, [wakeLock])

    // Toggle wake lock
    const toggle = useCallback(async () => {
        if (isActive) {
            await releaseWakeLock()
        } else {
            await requestWakeLock()
        }
    }, [isActive, requestWakeLock, releaseWakeLock])

    // Re-acquire wake lock when page becomes visible (after tab switch)
    useEffect(() => {
        const handleVisibilityChange = async () => {
            if (document.visibilityState === 'visible' && isActive && !wakeLock) {
                await requestWakeLock()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
    }, [isActive, wakeLock, requestWakeLock])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (wakeLock) {
                wakeLock.release()
            }
        }
    }, [wakeLock])

    return {
        isActive,
        isSupported,
        toggle,
        requestWakeLock,
        releaseWakeLock
    }
}
