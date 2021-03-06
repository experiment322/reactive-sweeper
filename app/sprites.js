import React from 'react'
import { Image } from 'react-native'

import { styles } from './styles'
import { tileFlags } from './constants'

export const sprites = {
  '0': <Image style={styles.tile} source={require('../assets/images/game/0.png')} />,
  '1': <Image style={styles.tile} source={require('../assets/images/game/1.png')} />,
  '2': <Image style={styles.tile} source={require('../assets/images/game/2.png')} />,
  '3': <Image style={styles.tile} source={require('../assets/images/game/3.png')} />,
  '4': <Image style={styles.tile} source={require('../assets/images/game/4.png')} />,
  '5': <Image style={styles.tile} source={require('../assets/images/game/5.png')} />,
  '6': <Image style={styles.tile} source={require('../assets/images/game/6.png')} />,
  '7': <Image style={styles.tile} source={require('../assets/images/game/7.png')} />,
  '8': <Image style={styles.tile} source={require('../assets/images/game/8.png')} />,
  'f': <Image style={styles.tile} source={require('../assets/images/game/f.png')} />,
  'm': <Image style={styles.tile} source={require('../assets/images/game/m.png')} />,
  't': <Image style={styles.tile} source={require('../assets/images/game/t.png')} />
}

export function getSpriteNameForTile (t) {
  switch (t.flags) {
    case tileFlags.V:
      return `${t.minesAround}`
    case tileFlags.MV:
      return 'm'
    case tileFlags.F:
    case tileFlags.FM:
      return 'f'
    default:
      return 't'
  }
}
