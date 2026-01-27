import getRawStorage from "../storage/getRawStorage"
import saveRawStorage from "../storage/saveRawStorage"
import { _pushHistoryEntry } from "./useGameManager"
import evaluateAchievements from './evaluateAchievements'

function isLegalFinish(outshot, multiplier, prevPoints) {
	if (!outshot) outshot = 'double'
	switch (outshot) {
		case 'single':
			// finishing throw must be a single
			return multiplier === 1
		case 'double':
			// cannot finish on 1 and must be a double
			return multiplier === 2 && prevPoints !== 1
		case 'triple':
			// cannot finish on 1 or 2 and must be a triple
			return multiplier === 3 && prevPoints !== 1 && prevPoints !== 2
		default:
			return multiplier === 2 && prevPoints !== 1
	}
}

export function submitScore(value, multiplier = 1) {
	const raw = getRawStorage() || {}
	const game = raw.game || {}
	const players = game.players || []
	const idx = typeof game.activePlayerIndex === 'number' ? game.activePlayerIndex : 0
	const player = players[idx]
	if (!player) return null

	const scored = Number(value) * Number(multiplier)
	const prevPoints = Number(player.points || 0)
	const remaining = prevPoints - scored

	if (remaining < 0) {
		_pushHistoryEntry(raw, { playerIndex: idx, value: scored, multiplier, result: 'bust' })
		saveRawStorage(raw)
		return { result: 'bust' }
	}

	// enforce outshot rules for forbidden remaining values BEFORE applying the score
	const outshot = (game.outshot || (raw.setup && raw.setup.outshot) || 'double')
	// forbidden remaining values (other than <0) for certain outshot modes
	if (outshot === 'double') {
		// cannot leave 1; finishing (remaining===0) must be double
		if (remaining === 1 || (remaining === 0 && multiplier !== 2)) {
			_pushHistoryEntry(raw, { playerIndex: idx, value: scored, multiplier, result: 'bust', reason: 'invalid_outshot' })
			saveRawStorage(raw)
			return { result: 'bust' }
		}
	} else if (outshot === 'triple') {
		// cannot leave 1 or 2; finishing (remaining===0) must be triple
		if (remaining === 1 || remaining === 2 || (remaining === 0 && multiplier !== 3)) {
			_pushHistoryEntry(raw, { playerIndex: idx, value: scored, multiplier, result: 'bust', reason: 'invalid_outshot' })
			saveRawStorage(raw)
			return { result: 'bust' }
		}
	} else if (outshot === 'single') {
		// finishing (remaining===0) must be a single; otherwise it's a bust
		if (remaining === 0 && multiplier !== 1) {
			_pushHistoryEntry(raw, { playerIndex: idx, value: scored, multiplier, result: 'bust', reason: 'invalid_outshot' })
			saveRawStorage(raw)
			return { result: 'bust' }
		}
	}

	// handle exact finish (remaining === 0)
	if (remaining === 0) {
		player.points = 0
		_pushHistoryEntry(raw, { playerIndex: idx, value: scored, multiplier, remaining: 0 })
		const legs = game.legs || []
		const lastLeg = legs[legs.length - 1] || {}
		lastLeg.winnerIndex = idx
		// record finishing throw details for achievements
		lastLeg.finish = { multiplier, value: Number(value) }
		// evaluate achievements now that leg has a winner and finish info
		try { evaluateAchievements(raw, { type: 'finish', playerIndex: idx }) } catch (e) {}
		saveRawStorage(raw)
		return { result: 'finished', index: idx }
	}

	// normal score (not finishing)
	player.points = remaining
	_pushHistoryEntry(raw, { playerIndex: idx, value: scored, multiplier, remaining })
	saveRawStorage(raw)
	return { result: 'ok' }
}