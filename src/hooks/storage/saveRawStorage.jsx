export function saveRawStorage(storage) {
    try {
        localStorage.setItem('ShoutYourShot', JSON.stringify(storage || {}))
    } catch (e) {
        console.error('Failed to save storage', e)
    }
}

export default saveRawStorage
