import React, {Component} from 'react';
import {View, Text, Button, Picker, Alert} from 'react-native';

import {styles} from './styles';
import {difficulties} from './constants';

export default class Menu extends Component {
  helpTitle = 'How to play';
  helpText =
    '* Press on a tile to sweep it.\n' +
    '* Long press on a tile to put a flag on it.\n' +
    '* Drag to scroll the field.\n' +
    '* Have fun!';

  render() {
    const {selectedDifficulty, onDifficultyChange, onClickStart} = this.props;
    return (
      <View style={styles.menu}>
        <Text style={styles.gameTitle}>REACTIVE SWEEPER v1.2.1</Text>
        <Picker style={styles.picker} selectedValue={selectedDifficulty} onValueChange={v => onDifficultyChange(v)}>
          {difficulties.map(d => <Picker.Item key={d} label={`${d} rows`} value={d}/>)}
        </Picker>
        <View style={styles.menuButtons}>
          <Button title='NEW GAME' onPress={onClickStart}/>
          <Button title='?' onPress={() => Alert.alert(this.helpTitle, this.helpText)}/>
        </View>
      </View>
    );
  }
}
