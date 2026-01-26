import { getRawStorage } from '../storage/getRawStorage'

export function validateGamePresence(navigate) {
    const storage = getRawStorage()
    const exists = !!storage
    if (!exists && navigate) navigate('/setup')
    return { ok: exists }
}

export default validateGamePresence
