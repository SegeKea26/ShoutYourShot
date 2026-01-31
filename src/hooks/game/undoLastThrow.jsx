import getRawStorage from "../storage/getRawStorage"
import saveRawStorage from "../storage/saveRawStorage"

export function undoLastThrow() {
	const raw = getRawStorage() || {}
	const game = raw.game || {}
	const legs = game.legs || []
	const last = legs[legs.length - 1]
	if (!last || !last.history || last.history.length === 0) return { ok: false }

	const entry = last.history.pop()
	if (entry && typeof entry.playerIndex === 'number') {
		const p = game.players && game.players[entry.playerIndex]
		if (p && typeof entry.value === 'number') {
			if (entry.result !== 'bust') p.points = (p.points || 0) + entry.value
		}
		// Switch active player to the player who made this throw
		game.activePlayerIndex = entry.playerIndex
	}

	saveRawStorage(raw)
	return { ok: true, playerIndex: entry?.playerIndex }
}