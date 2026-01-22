import { getSetupFromStorage } from "./useStorageManager";

export function validateName(raw) {
    const name = (raw || '').trim();

    if (name.length < 1) return 'Name must be at least 1 character.';
    if (name.length > 16) return 'Name must be at most 16 characters.';

    const ok = /^[A-Za-z0-9 '-]+$/.test(name);
    if (!ok) return 'Name contains invalid characters.';

    return null;
}

export function validateSetup() {
    const s = getSetupFromStorage() || {}
    const missing = []
    
    if (!('startPoints' in s) || s.startPoints === '' || s.startPoints === undefined) missing.push('startPoints')
    if (!('legs' in s) || s.legs === '' || s.legs === undefined) missing.push('legs')
    if (!s.player1) missing.push('player1')
    if (!s.player2) missing.push('player2')

    return { ok: missing.length === 0, missing }
}
