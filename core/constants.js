import {Dimensions} from 'react-native';

export const tileFlags = {
  V: 1,
  M: 2,
  MV: 3,
  F: 4,
  FV: 5,
  FM: 6,
  FMV: 7
};

export const fieldTiles = 10;
export const difficulties = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
export const tileFlipComboThreshold = 100;

const window = Dimensions.get('window');
const tileSize = 10;
const gameScale = Math.floor(Math.min(window.width, window.height) / (fieldTiles * tileSize));

export const tileBasis = gameScale * tileSize;
export const fieldBasis = tileBasis * fieldTiles;
