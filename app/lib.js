import { fieldTiles, tileFlags } from './constants'

function increaseMineCountForTile (i, j, f) {
  f.data[i][j].minesAround++
}

function canFlipTile (i, j, f) {
  return !(f.data[i][j].flags & tileFlags.FV)
}

function canFlagTile (i, j, f) {
  return !!(f.visibleTiles) && !(f.data[i][j].flags & tileFlags.V)
}

function isTileMined (i, j, f) {
  return !!(f.data[i][j].flags & tileFlags.M)
}

function isTileAroundTile (i, j, ii, jj) {
  return Math.abs(ii - i) < 2 && Math.abs(jj - j) < 2
}

function applyAroundTile (i, j, f, cb) {
  for (let ii = Math.max(0, i - 1); ii <= Math.min(f.rows - 1, i + 1); ++ii) {
    for (let jj = Math.max(0, j - 1); jj <= Math.min(f.columns - 1, j + 1); ++jj) {
      if (ii !== i || jj !== j) cb(ii, jj, f)
    }
  }
}

function recursivelyFlipTiles (i, j, f) {
  if (canFlipTile(i, j, f)) {
    f.visibleTiles++
    f.data[i][j].flags |= tileFlags.V
    if (isTileMined(i, j, f)) {
      f.isLost = true
    } else if (!f.data[i][j].minesAround) {
      applyAroundTile(i, j, f, recursivelyFlipTiles)
    }
  }
}

function getRandomTileIfCallbackReturnsValue (f, cb, rv) {
  let i, j
  do {
    i = Math.floor(Math.random() * f.rows) % f.rows
    j = Math.floor(Math.random() * f.columns) % f.columns
  } while (cb(i, j, f) !== rv)
  return {i, j}
}

function placeMines (i, j, f) {
  const canPlaceMineAt = (ii, jj, ff) => !isTileMined(ii, jj, ff) && !isTileAroundTile(i, j, ii, jj)
  for (let m = 0; m < f.mineCount; ++m) {
    const p = getRandomTileIfCallbackReturnsValue(f, canPlaceMineAt, true)
    applyAroundTile(p.i, p.j, f, increaseMineCountForTile)
    f.data[p.i][p.j].flags = tileFlags.M
  }
}

export function createField (r, p) {
  const f = {
    data: [],
    rows: Number(r),
    isLost: false,
    columns: Number(fieldTiles),
    tileCount: Number(r) * Number(fieldTiles),
    mineCount: Math.floor(Number(r) * Number(fieldTiles) / 100 * Number(p)),
    visibleTiles: 0
  }
  for (let i = 0; i < f.rows; ++i) {
    f.data[i] = []
    for (let j = 0; j < f.columns; ++j) {
      f.data[i][j] = {flags: 0, minesAround: 0}
    }
  }
  return f
}

export function flagTile (i, j, f) {
  if (canFlagTile(i, j, f)) {
    const nf = JSON.parse(JSON.stringify(f))
    nf.data[i][j].flags ^= tileFlags.F
    return nf
  }
  return f
}

export function flipTile (i, j, f) {
  if (canFlipTile(i, j, f)) {
    const nf = JSON.parse(JSON.stringify(f))
    if (!nf.visibleTiles) placeMines(i, j, nf)
    recursivelyFlipTiles(i, j, nf)
    return nf
  }
  return f
}

export function isFieldWon (f) {
  return f.tileCount - f.visibleTiles === f.mineCount
}

export function isFieldLost (f) {
  return f.isLost
}
