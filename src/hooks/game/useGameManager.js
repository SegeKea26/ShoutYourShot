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
	let last = storage.game.legs[storage.game.legs.length - 1]
	if (!last) {
		// delegate leg creation to startNextLeg to keep behavior consistent
		try {
			startNextLeg(storage)
		} catch (e) {
			storage.game.legs.push({ legId: 1, players: storage.game.players || [], history: [] })
		}
		last = storage.game.legs[storage.game.legs.length - 1]
	}
	last.history.push(entry)

	try {
		evaluateAchievements(storage, entry)
	} catch (e) {
		// swallow evaluation errors to avoid breaking game flow
		console.error('Achievement evaluation failed', e)
	}
}

import { switchActivePlayer} from './switchActivePlayer'
import { submitScore } from './submitScore'
import { recordMiss } from './recordMiss'
import { undoLastThrow } from './undoLastThrow'
import { startNextLeg } from './startNextLeg'
import evaluateAchievements from './evaluateAchievements'

export { switchActivePlayer, submitScore, recordMiss, undoLastThrow, startNextLeg }

export default { initializeGame, switchActivePlayer, submitScore, recordMiss, undoLastThrow, startNextLeg }