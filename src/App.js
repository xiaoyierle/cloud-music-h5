import React, { Component } from 'react'
import { IconStyle } from './assets/iconfont/iconfont'
import { GlobalStyle } from './style'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <i className="iconfont">&#xe62b;</i>
      </div>
    )
  }
}

export default App;
