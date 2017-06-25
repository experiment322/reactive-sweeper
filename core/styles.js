import {StyleSheet} from 'react-native';

import {fieldTiles, gameScreenBasis} from './constants';

const center = {alignItems: 'center', justifyContent: 'center'};
const fullscreen = {width: '100%', height: '100%'};
const fullscreenAndCenter = {...fullscreen, ...center};

export const styles = StyleSheet.create({
  screen: {
    ...fullscreenAndCenter,
    backgroundColor: 'black'
  },
  menu: {
    ...fullscreenAndCenter,
    zIndex: 1,
    opacity: 0.7,
    position: 'absolute',
    backgroundColor: 'black'
  },
  field: {
    flexBasis: gameScreenBasis,
    aspectRatio: 1,
    backgroundColor: 'lavender'
  },
  tile: {
    flexBasis: gameScreenBasis / fieldTiles,
    aspectRatio: 1
  },
  tileRow: {
    flexBasis: gameScreenBasis,
    flexDirection: 'row'
  },
  gameTitle: {
    color: 'yellow',
    fontSize: 16
  },
  picker: {
    width: '50%',
    backgroundColor: 'white'
  },
  menuButtons: {
    width: '50%',
    height: '25%',
    justifyContent: 'space-between'
  }
});
