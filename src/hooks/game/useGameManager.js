import { initializeGameStorage } from '../storage/useStorageManager'
import { validateSetup } from '../setup/useValidationManager'

export function initializeGame(navigate) {
	function startIfReady() {
		const res = validateSetup()
		if (!res.ok) return { ok: false, missing: res.missing }
		initializeGameStorage()
		if (navigate) navigate('/game')
		return { ok: true }
	}

	return { startIfReady }
}

export function _pushHistoryEntry(storage, entry) {
	storage.game = storage.game || {}
	storage.game.legs = storage.game.legs || []
	const last = storage.game.legs[storage.game.legs.length - 1]
	if (!last) {
		storage.game.legs.push({ legId: 1, players: storage.game.players || [], history: [] })
	}
	storage.game.legs[storage.game.legs.length - 1].history.push(entry)
}

import { switchActivePlayer} from './switchActivePlayer'
import { submitScore } from './submitScore'
import { recordMiss } from './recordMiss'
import { undoLastThrow } from './undoLastThrow'

export { switchActivePlayer, submitScore, recordMiss, undoLastThrow }

export default { initializeGame, switchActivePlayer, submitScore, recordMiss, undoLastThrow }