import {tileFlags, fieldTiles} from './constants';

function increaseMinesAroundTile(i, j, f) {
  f[i][j].minesAround++;
}

function isPointValidForMine(i, j, f) {
  return !(f[i][j].flags & tileFlags.M);
}

function applyAroundPointInField(i, j, f, cb) {
  for (let ii = Math.max(0, i - 1); ii <= Math.min(f.rows - 1, i + 1); ++ii) {
    for (let jj = Math.max(0, j - 1); jj <= Math.min(f.columns - 1, j + 1); ++jj) {
      if (ii !== i || jj !== j) cb(ii, jj, f);
    }
  }
}

function getRandomPointInFieldIfTrue(f, cb) {
  let i, j;
  do {
    i = Math.floor(Math.random() * f.rows) % f.rows;
    j = Math.floor(Math.random() * f.columns) % f.columns;
  } while (!cb(i, j, f));
  return {i, j};
}

export function createField(r) {
  const f = [];
  f.rows = r;
  f.isLost = false;
  f.columns = fieldTiles;
  f.tileCount = r * fieldTiles;
  f.visibleTiles = 0;
  for (let i = 0; i < f.rows; ++i) {
    f[i] = [];
    for (let j = 0; j < f.columns; ++j) {
      f[i][j] = {flags: 0, minesAround: 0};
    }
  }
  const mineFactor = Math.floor(Math.sqrt(fieldTiles));
  f.mineCount = Math.ceil(f.rows / mineFactor) * Math.ceil(f.columns / mineFactor);
  for (let m = 0; m < f.mineCount; ++m) {
    const p = getRandomPointInFieldIfTrue(f, isPointValidForMine);
    applyAroundPointInField(p.i, p.j, f, increaseMinesAroundTile);
    f[p.i][p.j].flags |= tileFlags.M;
  }
  return f;
}

export function flagTile(i, j, f) {
  if (!(f[i][j].flags & tileFlags.V)) {
    f[i][j].flags ^= tileFlags.F;
    return true;
  }
  return false;
}

export function flipTile(i, j, f) {
  const n = f.visibleTiles;
  if (!(f[i][j].flags & tileFlags.FV)) {
    f.visibleTiles++;
    f[i][j].flags |= tileFlags.V;
    if (f[i][j].flags & tileFlags.M) {
      f.isLost = true;
    } else if (!f[i][j].minesAround) {
      applyAroundPointInField(i, j, f, flipTile);
    }
    return f.visibleTiles - n;
  }
  return false;
}

export function isFieldWon(f) {
  return f.tileCount - f.visibleTiles === f.mineCount;
}

export function isFieldLost(f) {
  return f.isLost;
}
