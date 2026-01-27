export function computePlayerStatistics(raw, playerIndex) {
  const game = (raw && raw.game) || {}
  const players = game.players || []
  const legs = game.legs || []
  const name = players[playerIndex] ? players[playerIndex].name : null

  const entries = [].concat(...legs.map(l => (l.history || []).filter(e => e.playerIndex === playerIndex)))
  const busts = entries.filter(e => e.result === 'bust').length
  const darts = entries.length
  const scoreTotal = entries.reduce((s,e)=>s + (Number(e.value)||0), 0)
  const visits = [].concat(...legs.map(l => groupVisits(l.history).filter(v=>v.playerIndex===playerIndex)))
  const visit180s = visits.filter(v => v.entries.reduce((S,e)=>S+(Number(e.value)||0),0) === 180).length
  const legsWon = legs.filter(l => l.winnerIndex === playerIndex).length

  return { index: playerIndex, name, busts, darts, scoreTotal, visit180s, legsWon }
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

export default computePlayerStatistics
