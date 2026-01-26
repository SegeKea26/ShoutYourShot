export function initializeGameStorage() { 
    let storage = JSON.parse(localStorage.getItem('ShoutYourShot')) || { setup: {} };
    if (storage.game && storage.game.players && storage.game.players.length > 0) return

    const startPoints = parseInt(storage.setup.startPoints, 10) || 301

    storage.game = {
        totalLegs: parseInt(storage.setup.legs, 10) || 1,
        startPoints,
        activePlayerIndex: Math.floor(Math.random() * 2),
        players: [
            { name: storage.setup.player1, points: startPoints },
            { name: storage.setup.player2, points: startPoints }
        ],
        legs: [
            {
                legId: 1,
                players: [
                    { name: storage.setup.player1, points: startPoints },
                    { name: storage.setup.player2, points: startPoints }
                ],
                history: []
            }
        ],
        currentLeg: 1,
    }

    localStorage.setItem('ShoutYourShot', JSON.stringify(storage))
}

export default initializeGameStorage
