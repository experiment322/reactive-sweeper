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

  render() {
    const {selectedDifficulty, onClickStart, onDifficultyChange} = this.props;
    return (
      <View style={styles.menu}>
        <View style={styles.menuSection}>
          <Text style={styles.gameTitle}>REACTIVE SWEEPER</Text>
        </View>
        <View style={styles.menuSection}>
          <ScrollingMenu items={difficulties}
                         onSelect={onDifficultyChange}
                         itemStyle={styles.menuText}
                         defaultIndex={selectedDifficulty}
                         containerStyle={styles.menuButton}
                         selectedItemStyle={styles.activeMenuText}/>
          <Button title='START'
                  style={styles.menuText}
                  onPress={onClickStart}
                  disabled={!(selectedDifficulty in difficulties)}
                  containerStyle={selectedDifficulty in difficulties ? styles.menuButton : styles.disabledMenuButton}>
            START
          </Button>
          <Button title='HELP'
                  style={styles.menuText}
                  onPress={Menu.showHelp}
                  containerStyle={styles.menuButton}>
            HELP
          </Button>
        </View>
      </View>
    );
  }
}
