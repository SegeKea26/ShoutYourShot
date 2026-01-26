export function newStorage() {
    const defaultStorage = { setup: {}, game: {} };

    localStorage.setItem('ShoutYourShot', JSON.stringify(defaultStorage));
}

export default newStorage
