import React, {PureComponent} from 'react';
import {View, Text, Alert} from 'react-native';
import Button from 'react-native-button';
import ScrollingMenu from 'react-native-scrolling-menu';

import {styles} from './styles';
import {difficulties} from './constants';

export default class Menu extends PureComponent {
  static helpTitle =
    'How to play';

  static helpText =
    '* Short press to sweep.\n' +
    '* Long press to flag.\n' +
    '* Drag to scroll.\n' +
    '* Have fun!';

  static showHelp() {
    Alert.alert(Menu.helpTitle, Menu.helpText);
  }

  componentDidMount() {
    const {onDifficultyChange} = this.props;
    onDifficultyChange(-1);
  }

  render() {
    const {selectedDifficulty, onClickStart, onDifficultyChange} = this.props;
    return (
      <View style={styles.menu}>
        <View style={styles.menuButtonGroup}>
          <Text style={styles.gameTitle}>REACTIVE SWEEPER</Text>
        </View>
        <View style={styles.menuButtonGroup}>
          <ScrollingMenu items={difficulties} onSelect={onDifficultyChange} containerStyle={styles.menuButton}
                         itemStyle={styles.menuText} selectedItemStyle={styles.activeMenuText}/>
          <Button title='START' containerStyle={selectedDifficulty ? styles.menuButton : styles.disabledMenuButton}
                  style={styles.menuText} disabled={!selectedDifficulty} onPress={onClickStart}>START</Button>
          <Button title='HELP' containerStyle={styles.menuButton}
                  style={styles.menuText} onPress={Menu.showHelp}>HELP</Button>
        </View>
      </View>
    );
  }
}
