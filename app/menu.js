import React, { PureComponent } from 'react'
import { Alert, Animated, Text, View } from 'react-native'
import Button from 'react-native-button'
import ScrollingMenu from 'react-native-scrolling-menu'

import { styles } from './styles'
import { difficulties, percentages } from './constants'

export default class Menu extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {fadeAnimation: new Animated.Value(1)}
    this.fadeMenu = this.fadeMenu.bind(this)
    this.revealMenu = this.revealMenu.bind(this)
  }

  static showHelp () {
    Alert.alert(Menu.helpTitle, Menu.helpText)
  }

  fadeMenu () {
    Animated.timing(this.state.fadeAnimation, {toValue: 0, duration: 1000, useNativeDriver: true}).start()
    return true
  }

  revealMenu () {
    Animated.timing(this.state.fadeAnimation, {toValue: 1, duration: 1000, useNativeDriver: true}).start()
    return true
  }

  render () {
    const {selectedPercentage, selectedDifficulty, onClickStart, onPercentageChange, onDifficultyChange} = this.props
    const canStartGame = selectedPercentage in percentages && selectedDifficulty in difficulties
    return (
      <Animated.View style={[styles.menu, {opacity: this.state.fadeAnimation}]}>
        <View
          style={styles.menuSection}
          onResponderRelease={this.revealMenu}
          onStartShouldSetResponder={this.fadeMenu}
        >
          <Text style={styles.gameTitle}>
            REACTIVE SWEEPER
          </Text>
        </View>
        <View style={styles.menuSection}>
          <ScrollingMenu
            items={Menu.difficulties}
            itemStyle={styles.menuText}
            defaultIndex={selectedDifficulty}
            containerStyle={styles.menuButton}
            selectedItemStyle={styles.activeMenuText}
            onSelect={onDifficultyChange}
          />
          <ScrollingMenu
            items={Menu.percentages}
            itemStyle={styles.menuText}
            defaultIndex={selectedPercentage}
            containerStyle={styles.menuButton}
            selectedItemStyle={styles.activeMenuText}
            onSelect={onPercentageChange}
          />
          <Button
            title='START'
            style={styles.menuText}
            disabled={!canStartGame}
            containerStyle={canStartGame ? styles.menuButton : styles.disabledMenuButton}
            onPress={onClickStart}
          >
            START
          </Button>
          <Button
            title='HELP'
            style={styles.menuText}
            containerStyle={styles.menuButton}
            onPress={Menu.showHelp}
          >
            HELP
          </Button>
        </View>
      </Animated.View>
    )
  }
}

Menu.difficulties = difficulties.map(i => `${i} LINES`)
Menu.percentages = percentages.map(i => `${i}% MINES`)
Menu.helpTitle = 'How to play'
Menu.helpText = '\n> Short press to sweep.\n> Long press to flag.\n> Drag to scroll.\n> Have fun!'
