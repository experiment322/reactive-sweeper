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
    fontSize: 32,
    textAlign: 'center',
    textShadowColor: 'crimson',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
    paddingHorizontal: 10
  },
  menuSection: {
    width: '100%',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  menuText: {
    color: 'gold',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'normal',
    backgroundColor: 'transparent',
    textShadowColor: 'gray',
    textShadowOffset: {width: 1, height: 1},
    paddingHorizontal: 32
  },
  activeMenuText: {
    color: 'gold',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    backgroundColor: 'gray',
    textShadowColor: 'crimson',
    textShadowOffset: {width: 1, height: 1},
    paddingHorizontal: 32
  },
  menuButton: {
    width: '90%',
    height: 32,
    backgroundColor: 'teal'
  },
  disabledMenuButton: {
    width: '90%',
    height: 32,
    backgroundColor: 'gray'
  }
});
