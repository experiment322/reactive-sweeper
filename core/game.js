import React, {Component} from 'react';
import {View, StatusBar, ToastAndroid, ActivityIndicator} from 'react-native';

import Menu from './menu';
import Field from './field';
import {styles} from './styles';
import {difficulties, tileFlipComboThreshold} from './constants';
import {createField, flipTiles, flagTile, isFieldLost, isFieldWon} from './lib';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: [[]],
      state: 'halt',
      preferences: {
        fieldRows: difficulties[0]
      }
    };
    this.gameStartTime = 0;
  }

  static notify(msg) {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.TOP);
  }

  setDifficulty(rows) {
    this.setState({preferences: {fieldRows: rows}});
  }

  newGame() {
    const {preferences} = this.state;
    this.setState({field: [[]], state: 'loading'});
    setTimeout(() => {
      this.setState({field: createField(preferences.fieldRows), state: 'running'});
      this.gameStartTime = Date.now();
    });
  }

  tapTile(i, j, shouldFlag) {
    const {field, state} = this.state;
    if (state !== 'running') return;
    if (shouldFlag) {
      flagTile(i, j, field) && Game.notify('Flag toggled.');
    } else {
      flipTiles(i, j, field) > tileFlipComboThreshold && Game.notify('Feeling lucky?');
    }
    this.setState({field});
  }

  updateGameState() {
    const {field} = this.state;
    if (isFieldLost(field)) {
      const tilesLeft = field.tileCount - field.visibleTiles - field.mineCount + 1;
      Game.notify(`You lost with ${tilesLeft} tiles left to sweep!`);
      this.setState({state: 'lost'});
    } else if (isFieldWon(field)) {
      const playTime = Math.ceil((Date.now() - this.gameStartTime) / 1000);
      Game.notify(`You did it in ${playTime} seconds!`);
      this.setState({state: 'won'});
    }
  }

  componentDidUpdate() {
    const {state} = this.state;
    state === 'running' && this.updateGameState();
  }

  render() {
    const {state, field, preferences} = this.state;
    return (
      <View style={styles.screen}>
        <StatusBar hidden/>
        {['loading'].includes(state) && (
          <ActivityIndicator size='large'/>
        )}
        {['running', 'won', 'lost'].includes(state) && (
          <Field field={field}
                 onTapTile={this.tapTile.bind(this)}/>
        )}
        {['halt', 'won', 'lost'].includes(state) && (
          <Menu onClickStart={this.newGame.bind(this)}
                onDifficultyChange={this.setDifficulty.bind(this)}
                selectedDifficulty={preferences.fieldRows}/>
        )}
      </View>
    );
  }
}
