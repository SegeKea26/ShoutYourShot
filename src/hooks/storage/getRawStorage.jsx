export function getRawStorage() {
    const raw = localStorage.getItem('ShoutYourShot')
    if (!raw) return null
    try {
        return JSON.parse(raw) || null
    } catch (e) {
        console.error('Failed to parse storage', e)
        return null
    }
}

export default getRawStorage
