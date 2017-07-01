import {StyleSheet} from 'react-native';

import {tileBasis, fieldBasis} from './constants';

export const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  menu: {
    width: fieldBasis,
    height: fieldBasis,
    zIndex: 1,
    opacity: 0.8,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'black'
  },
  field: {
    width: fieldBasis,
    height: fieldBasis,
    backgroundColor: 'lavender'
  },
  tileRow: {
    width: fieldBasis,
    flexDirection: 'row'
  },
  tile: {
    width: tileBasis,
    height: tileBasis
  },
  gameTitle: {
    color: 'olive',
    fontSize: 24,
    textShadowColor: 'crimson',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
    paddingHorizontal: 10
  },
  menuButtonGroup: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  menuText: {
    color: 'gold',
    fontSize: 16,
    overflow: 'hidden',
    borderRadius: 8,
    lineHeight: 20,
    fontWeight: 'normal',
    backgroundColor: 'transparent',
    textShadowColor: 'gray',
    textShadowOffset: {width: 1, height: 1},
    paddingHorizontal: 20
  },
  activeMenuText: {
    color: 'gold',
    fontSize: 16,
    overflow: 'hidden',
    borderRadius: 8,
    lineHeight: 20,
    fontWeight: 'bold',
    backgroundColor: 'gray',
    textShadowColor: 'crimson',
    textShadowOffset: {width: 1, height: 1},
    paddingHorizontal: 20
  },
  menuButton: {
    width: '50%',
    height: 20,
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: 'teal'
  },
  disabledMenuButton: {
    width: '50%',
    height: 20,
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: 'gray'
  }
});
