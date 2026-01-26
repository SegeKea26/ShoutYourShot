import getRawStorage from "../storage/getRawStorage"
import saveRawStorage from "../storage/saveRawStorage"
import { _pushHistoryEntry } from "./useGameManager"

export function recordMiss() {
	const raw = getRawStorage() || {}
	const game = raw.game || {}
	const idx = typeof game.activePlayerIndex === 'number' ? game.activePlayerIndex : 0
	_pushHistoryEntry(raw, { playerIndex: idx, value: 0, multiplier: 1 })
	saveRawStorage(raw)
}