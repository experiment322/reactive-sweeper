import React, { PureComponent } from 'react'
import { AppLoading, Asset, Font } from 'expo'
import Game from './app/game'

export default class App extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {loading: true}
  }

  static cacheFonts (fonts) {
    return fonts.map(font => Font.loadAsync(font))
  }

  static cacheImages (images) {
    return images.map(image => Asset.loadAsync(image))
  }

  static cacheAssets () {
    const fontAssets = App.cacheFonts([
      {'Orbitron': require('./assets/fonts/Orbitron.ttf')},
      {'Audiowide': require('./assets/fonts/Audiowide.ttf')}
    ])
    const imageAssets = App.cacheImages([
      require('./assets/images/game/0.png'),
      require('./assets/images/game/1.png'),
      require('./assets/images/game/2.png'),
      require('./assets/images/game/3.png'),
      require('./assets/images/game/4.png'),
      require('./assets/images/game/5.png'),
      require('./assets/images/game/6.png'),
      require('./assets/images/game/7.png'),
      require('./assets/images/game/8.png'),
      require('./assets/images/game/f.png'),
      require('./assets/images/game/m.png'),
      require('./assets/images/game/t.png')
    ])
    return Promise.all([...fontAssets, ...imageAssets])
  }

  componentDidMount () {
    App.cacheAssets().then(() => { this.setState({loading: false}) })
  }

  render () {
    const {loading} = this.state
    return loading ? <AppLoading /> : <Game />
  }
}
