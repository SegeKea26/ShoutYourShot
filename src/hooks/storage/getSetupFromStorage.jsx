export function getSetupFromStorage() {
    const raw = localStorage.getItem('ShoutYourShot')
    if (!raw) return {}
    const storage = JSON.parse(raw) || {}
    return storage.setup || {}
}

export default getSetupFromStorage
