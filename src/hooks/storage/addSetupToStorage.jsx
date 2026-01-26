export function addSetupToStorage(name, val) {
    const storage = JSON.parse(localStorage.getItem('ShoutYourShot'));

    storage.setup[name] = val;
    localStorage.setItem('ShoutYourShot', JSON.stringify(storage))
}

export default addSetupToStorage
