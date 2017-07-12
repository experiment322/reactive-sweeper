import React, {PureComponent} from 'react';
import {View, Text, Alert} from 'react-native';
import Button from 'react-native-button';
import ScrollingMenu from 'react-native-scrolling-menu';

import {styles} from './styles';
import {percentages, difficulties} from './constants';

export default class Menu extends PureComponent {
  constructor(props) {
    super(props);
    this.percentages = percentages.map(i => `${i}% MINES`);
    this.difficulties = difficulties.map(i => `${i} LINES`);
  }

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
    const {selectedPercentage, selectedDifficulty, onClickStart, onPercentageChange, onDifficultyChange} = this.props;
    const canStartGame = selectedPercentage in percentages && selectedDifficulty in difficulties;
    return (
      <View style={styles.menu}>
        <View style={styles.menuSection}>
          <Text style={styles.gameTitle}>REACTIVE SWEEPER</Text>
        </View>
        <View style={styles.menuSection}>
          <ScrollingMenu items={this.difficulties}
                         onSelect={onDifficultyChange}
                         itemStyle={styles.menuText}
                         defaultIndex={selectedDifficulty}
                         containerStyle={styles.menuButton}
                         selectedItemStyle={styles.activeMenuText}/>
          <ScrollingMenu items={this.percentages}
                         onSelect={onPercentageChange}
                         itemStyle={styles.menuText}
                         defaultIndex={selectedPercentage}
                         containerStyle={styles.menuButton}
                         selectedItemStyle={styles.activeMenuText}/>
        </View>
        <View style={styles.menuSection}>
          <Button title='START'
                  style={styles.menuText}
                  onPress={onClickStart}
                  disabled={!canStartGame}
                  containerStyle={canStartGame ? styles.menuButton : styles.disabledMenuButton}>
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
