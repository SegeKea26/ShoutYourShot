import getRawStorage from "../storage/getRawStorage"
import saveRawStorage from "../storage/saveRawStorage"

export function switchActivePlayer() {
	const raw = getRawStorage() || {}
	const game = raw.game || {}
	const players = game.players || []
	if (!players || players.length === 0) return
	const idx = typeof game.activePlayerIndex === 'number' ? game.activePlayerIndex : 0
	game.activePlayerIndex = (idx + 1) % players.length
	saveRawStorage(raw)
}
