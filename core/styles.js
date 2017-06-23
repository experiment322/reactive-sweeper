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
    flexWrap: 'wrap',
    flexBasis: gameScreenBasis,
    aspectRatio: 1,
    flexDirection: 'row'
  },
  scrollBar: {
    width: '1%',
    zIndex: 1,
    position: 'absolute',
    backgroundColor: 'tomato'
  },
  tile: {
    flexBasis: gameScreenBasis / fieldTiles,
    aspectRatio: 1
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
