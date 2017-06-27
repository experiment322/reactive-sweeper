import {StyleSheet} from 'react-native';

import {tileBasis, fieldBasis} from './constants';

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
    flexBasis: fieldBasis,
    aspectRatio: 1,
    backgroundColor: 'lavender'
  },
  tileRow: {
    flexBasis: fieldBasis,
    flexDirection: 'row'
  },
  tile: {
    flexBasis: tileBasis,
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
