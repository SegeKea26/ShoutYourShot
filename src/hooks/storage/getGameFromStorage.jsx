export function getGameFromStorage() {
    const raw = localStorage.getItem('ShoutYourShot')
    if (!raw) return null
    const storage = JSON.parse(raw) || {}
    return storage.game || null
}

export default getGameFromStorage
