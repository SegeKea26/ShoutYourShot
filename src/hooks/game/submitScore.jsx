import getRawStorage from "../storage/getRawStorage"
import saveRawStorage from "../storage/saveRawStorage"
import { _pushHistoryEntry } from "./useGameManager"

export function submitScore(value, multiplier = 1) {
	const raw = getRawStorage() || {}
	const game = raw.game || {}
	const players = game.players || []
	const idx = typeof game.activePlayerIndex === 'number' ? game.activePlayerIndex : 0
	const player = players[idx]
	if (!player) return null

	const scored = Number(value) * Number(multiplier)
	const remaining = (player.points || 0) - scored

	if (remaining < 0) {
		_pushHistoryEntry(raw, { playerIndex: idx, value: scored, multiplier, result: 'bust' })
		saveRawStorage(raw)
		return { result: 'bust' }
	}

	player.points = remaining
	_pushHistoryEntry(raw, { playerIndex: idx, value: scored, multiplier, remaining })

	if (remaining === 0) {
		const legs = game.legs || []
		const lastLeg = legs[legs.length - 1] || {}
		lastLeg.winnerIndex = idx
		saveRawStorage(raw)
		return { result: 'finished', index: idx }
	}

	saveRawStorage(raw)
	return { result: 'ok' }
}