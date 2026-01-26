import { getSetupFromStorage } from '../storage/getSetupFromStorage'

export function validateSetup() {
    const s = getSetupFromStorage() || {}
    const missing = []
    
    if (!('startPoints' in s) || s.startPoints === '' || s.startPoints === undefined) missing.push('startPoints')
    if (!('legs' in s) || s.legs === '' || s.legs === undefined) missing.push('legs')
    if (!s.player1) missing.push('player1')
    if (!s.player2) missing.push('player2')

    return { ok: missing.length === 0, missing }
}

export default validateSetup
