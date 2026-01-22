export function newStorage() {
    const defaultStorage = { setup: {}, game: {} };

    localStorage.setItem('ShoutYourShot', JSON.stringify(defaultStorage));
}

export function addSetupToStorage(name, val) {
    const storage = JSON.parse(localStorage.getItem('ShoutYourShot'));

    storage.setup[name] = val;
    localStorage.setItem('ShoutYourShot', JSON.stringify(storage))
}

export function getSetupFromStorage() {
    const storage = JSON.parse(localStorage.getItem('ShoutYourShot'));

    return storage.setup;
}