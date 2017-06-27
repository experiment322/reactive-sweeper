import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

import {styles} from './styles';
import {fieldTiles, fieldBasis} from './constants';
import {sprites, getSpriteNameForTile} from './sprites';

export default class Field extends Component {
  static getRowKey(item, index) {
    return index;
  }

  static getRowLayout(data, index) {
    return {
      index,
      length: fieldBasis / fieldTiles,
      offset: fieldBasis / fieldTiles * index
    };
  }

  renderRow({item: row, index: i}) {
    return (
      <View key={i} style={styles.tileRow}>
        {row.map((tile, j) => this.renderTile(i, j, tile))}
      </View>
    );
  }

  renderTile(i, j, tile) {
    const {onTapTile} = this.props;
    return (
      <View key={j} style={styles.tile}>
        <TouchableScale activeScale={0.5}
                        onPress={() => onTapTile(i, j, false)}
                        onLongPress={() => onTapTile(i, j, true)}>
          {sprites[getSpriteNameForTile(tile)]}
        </TouchableScale>
      </View>
    );
  }

  render() {
    const {field} = this.props;
    return (
      <View style={styles.field}>
        <FlatList initialNumToRender={0} windowSize={1}
                  data={[...field]} renderItem={this.renderRow.bind(this)}
                  keyExtractor={Field.getRowKey} getItemLayout={Field.getRowLayout}/>
      </View>
    );
  }
}
