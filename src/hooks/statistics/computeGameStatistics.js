export function computeGameStatistics(raw) {
  const game = (raw && raw.game) || {}
  const players = game.players || []
  const legs = game.legs || []

  const legWins = (players || []).map(() => 0)
  for (const l of legs) {
    if (typeof l.winnerIndex === 'number') {
      legWins[l.winnerIndex] = (legWins[l.winnerIndex] || 0) + 1
    }
  }

  let winnerIndex = null
  let maxWins = -1
  legWins.forEach((w, i) => {
    if (w > maxWins) { maxWins = w; winnerIndex = i }
  })
  const winnerName = typeof winnerIndex === 'number' && players[winnerIndex] ? players[winnerIndex].name : null

  const totalBusts = legs.reduce((s, leg) => s + ((leg.history || []).filter(e => e.result === 'bust').length), 0)

  const visits = [].concat(...legs.map(l => groupVisits(l.history)))
  const total180s = visits.filter(v => (v.entries || []).reduce((S,e)=>S+(Number(e.value)||0),0) === 180).length

  const gameAchievements = (game.achievements || []).slice()

  const playerStatistics = (players || []).map((p, idx) => {
    const playerEntries = [].concat(...legs.map(l => (l.history || []).filter(e => e.playerIndex === idx)))
    const busts = playerEntries.filter(e => e.result === 'bust').length
    const darts = playerEntries.length
    const scoreTotal = playerEntries.reduce((s,e)=>s + (Number(e.value)||0), 0)
    const visitsForPlayer = [].concat(...legs.map(l => groupVisits(l.history).filter(v=>v.playerIndex===idx)))
    const visit180s = visitsForPlayer.filter(v => v.entries.reduce((S,e)=>S+(Number(e.value)||0),0) === 180).length
    const legsWon = legs.filter(l => l.winnerIndex === idx).length
    return { index: idx, name: p.name, busts, darts, scoreTotal, visit180s, legsWon }
  })

  return {
    winnerName,
    selectedTotalPoints: game.startPoints,
    legsPlayed: legs.length,
    totalLegs: game.totalLegs,
    outshot: game.outshot,
    totalBusts,
    total180s,
    gameAchievements,
    playerStatistics
  }
}

function groupVisits(history) {
  const visits = []
  let current = null
  for (const e of history || []) {
    if (!current || current.playerIndex !== e.playerIndex || current.entries.length >= 3) {
      current = { playerIndex: e.playerIndex, entries: [] }
      visits.push(current)
    }
    current.entries.push(e)
  }
  return visits
}

export default computeGameStatistics
