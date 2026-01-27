import getRawStorage from '../storage/getRawStorage'
import saveRawStorage from '../storage/saveRawStorage'

export function startNextLeg(rawParam) {
  const raw = rawParam || getRawStorage() || {}
  raw.game = raw.game || {}
  const game = raw.game

  const totalLegs = game.totalLegs || 1
  const legs = game.legs || []
  const completedCount = legs.filter(l => typeof l.winnerIndex === 'number').length
  if (completedCount >= totalLegs) return { ok: false, reason: 'no_more_legs' }

  const startPoints = game.startPoints || 301

  if (Array.isArray(game.players)) {
    game.players = game.players.map(p => ({ name: p.name, points: startPoints }))
  }

  game.legs = game.legs || []
  const lastLeg = game.legs[game.legs.length - 1]
  const lastId = lastLeg && typeof lastLeg.legId === 'number' ? lastLeg.legId : 0
  const newLegId = lastId + 1

  game.legs.push({
    legId: newLegId,
    players: (game.players || []).map(p => ({ name: p.name, points: p.points })),
    history: []
  })

  game.currentLeg = newLegId
  game.activePlayerIndex = Math.floor(Math.random() * (game.players ? game.players.length : 1))

  if (!rawParam) saveRawStorage(raw)
  return { ok: true }
}

export default startNextLeg
