import React, {Component} from 'react';
import {View, Alert, StatusBar, ActivityIndicator} from 'react-native';
import Toast from 'react-native-root-toast';

import Menu from './menu';
import Field from './field';
import {styles} from './styles';
import {difficulties} from './constants';
import {createField, flipTile, flagTile, isFieldLost, isFieldWon} from './lib';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: [[]],
      state: 'halt',
      difficulty: null,
      gameStartTime: null
    };
  }

  static notify(msg) {
    Toast.show(msg, {
      duration: 500,
      position: Toast.positions.TOP,
      backgroundColor: 'chocolate'
    });
  }

  setDifficulty(index) {
    this.setState({
      difficulty: difficulties[index]
    });
  }

  newGame() {
    const {difficulty} = this.state;
    this.setState({
      field: [[]],
      state: 'loading'
    });
    window.requestAnimationFrame(() => {
      this.setState({
        field: createField(difficulty),
        state: 'running',
        gameStartTime: Date.now()
      });
    });
  }

  tapTile(i, j, shouldFlag) {
    const {field, state} = this.state;
    if (state !== 'running') return;
    window.requestAnimationFrame(() => {
      if (shouldFlag && flagTile(i, j, field) || flipTile(i, j, field)) {
        shouldFlag && Game.notify('Flag toggled.');
        this.setState({field});
      }
    });
  }

  componentDidUpdate() {
    const {field, state, gameStartTime} = this.state;
    if (state !== 'running') return;
    window.requestAnimationFrame(() => {
      if (isFieldLost(field)) {
        const tilesLeft = field.tileCount - field.visibleTiles - field.mineCount + 1;
        Alert.alert('Game lost', `You lost with ${tilesLeft} tiles left to sweep!`);
        this.setState({state: 'lost'});
      } else if (isFieldWon(field)) {
        const playTime = Math.ceil((Date.now() - gameStartTime) / 1000);
        Alert.alert('Game won', `You did it in ${playTime} seconds!`);
        this.setState({state: 'won'});
      }
    });
  }

  render() {
    const {state, field, difficulty} = this.state;
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
                selectedDifficulty={difficulty}
                onDifficultyChange={this.setDifficulty.bind(this)}/>
        )}
      </View>
    );
  }
}
