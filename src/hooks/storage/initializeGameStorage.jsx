import { startNextLeg } from '../game/startNextLeg'
import saveRawStorage from './saveRawStorage'

export function initializeGameStorage() { 
    let storage = JSON.parse(localStorage.getItem('ShoutYourShot')) || { setup: {} };
    if (storage.game && storage.game.players && storage.game.players.length > 0) return

    const startPoints = parseInt(storage.setup.startPoints, 10) || 301

    storage.game = {
        totalLegs: parseInt(storage.setup.legs, 10) || 1,
        startPoints,
        outshot: storage.setup && storage.setup.outshot ? storage.setup.outshot : 'double',
        activePlayerIndex: Math.floor(Math.random() * 2),
        players: [
            { name: storage.setup.player1, points: startPoints },
            { name: storage.setup.player2, points: startPoints }
        ],
        currentLeg: 1,
    }

    // delegate first leg creation to startNextLeg using the storage object
    try {
        startNextLeg(storage)
    } catch (e) {
        // fallback: create first leg inline
        storage.game.legs = [
            {
                legId: 1,
                players: storage.game.players.map(p => ({ name: p.name, points: p.points })),
                history: []
            }
        ]
    }

    saveRawStorage(storage)
}

export default initializeGameStorage
