import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';

import {styles} from './styles';
import {sprites, getSpriteNameForTile} from './sprites';
import {fieldTiles, scrollFactor, scrollThreshold} from './constants';

export default class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      scrolling: false
    };
    this.maxOffset = props.field.rows - fieldTiles;
    this.tempOffset = 0;
    this.firstTouchEvent = null;
  }

  setFirstTouchEvent({nativeEvent}) {
    this.firstTouchEvent = nativeEvent;
  }

  terminateScroll() {
    this.setState({scrolling: false});
  }

  shouldScroll({nativeEvent}) {
    if (Math.abs(nativeEvent.pageY - this.firstTouchEvent.pageY) > scrollThreshold) {
      this.setState({scrolling: true});
      return true;
    }
  }

  getScrollBarHeight() {
    const {offset} = this.state;
    return {height: `${offset / this.maxOffset * 100}%`};
  }

  handleScroll({nativeEvent}) {
    const {offset} = this.state;
    this.tempOffset -= (nativeEvent.pageY - this.firstTouchEvent.pageY) / scrollFactor;
    this.tempOffset = Math.min(Math.max(this.tempOffset, 0), this.maxOffset);
    if (Math.round(this.tempOffset) !== offset) {
      this.setState({offset: Math.round(this.tempOffset)});
    }
  }

  renderTile(i, j, tile) {
    const {onTapTile} = this.props;
    return (
      <View style={styles.tile}>
        <TouchableOpacity onPress={() => onTapTile(i, j, false)} onLongPress={() => onTapTile(i, j, true)}>
          {sprites[getSpriteNameForTile(tile)]}
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {field} = this.props;
    const {offset, scrolling} = this.state;
    const shownField = field.slice(offset, offset + fieldTiles);
    return (
      <View style={styles.field}
            onResponderMove={e => this.handleScroll(e)}
            onResponderRelease={() => this.terminateScroll()}
            onMoveShouldSetResponderCapture={e => this.shouldScroll(e)}
            onStartShouldSetResponderCapture={e => this.setFirstTouchEvent(e)}>
        {scrolling && <View style={[styles.scrollBar, this.getScrollBarHeight()]}/>}
        {shownField.map((row, i) => row.map((tile, j) => this.renderTile(i + offset, j, tile)))}
      </View>
    );
  }
}
