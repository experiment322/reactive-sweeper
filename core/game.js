import React, {PureComponent} from 'react';
import {View, Alert, StatusBar, ActivityIndicator} from 'react-native';
import Toast from 'react-native-root-toast';

import Menu from './menu';
import Field from './field';
import {styles} from './styles';
import {difficulties} from './constants';
import {createField, flipTile, flagTile, isFieldLost, isFieldWon} from './lib';

export default class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      field: {},
      state: 'halt',
      difficulty: null,
      gameStartTime: null
    };
    this.tapTile = this.tapTile.bind(this);
    this.newGame = this.newGame.bind(this);
    this.setDifficulty = this.setDifficulty.bind(this);
  }

  static notify(msg) {
    Toast.show(msg, {
      duration: 500,
      position: Toast.positions.TOP,
      backgroundColor: 'chocolate'
    });
  }

  setDifficulty(index) {
    this.setState({difficulty: index});
  }

  newGame() {
    const {difficulty} = this.state;
    this.setState({
      field: {},
      state: 'loading'
    });
    window.requestAnimationFrame(() => {
      this.setState({
        field: createField(difficulties[difficulty]),
        state: 'running',
        gameStartTime: Date.now()
      });
    });
  }

  tapTile(i, j, shouldFlag) {
    const {field, state} = this.state;
    if (state !== 'running') return;
    window.requestAnimationFrame(() => {
      if (shouldFlag) {
        this.setState({field: flagTile(i, j, field)});
      } else {
        this.setState({field: flipTile(i, j, field)});
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {field, state, gameStartTime} = this.state;
    if (state !== 'running') return;
    window.requestAnimationFrame(() => {
      if (prevState.field.visibleTiles === field.visibleTiles) {
        Game.notify('Flag toggled.');
      } else if (isFieldLost(field)) {
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
          <Field field={field} onTapTile={this.tapTile}/>
        )}
        {['halt', 'won', 'lost'].includes(state) && (
          <Menu selectedDifficulty={difficulty} onClickStart={this.newGame} onDifficultyChange={this.setDifficulty}/>
        )}
      </View>
    );
  }
}
