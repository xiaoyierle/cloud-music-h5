import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { GlobalStyle } from './style'
import { renderRoutes } from 'react-router-config' //renderRoutes 读取路由配置转化为 Route 标签
import { IconStyle } from './assets/iconfont/iconfont'
import store from './store/index'
import routes from './routes/index.js'
import { HashRouter } from 'react-router-dom'
import { Data } from './application/Singers/data'

class App extends Component {
  render() {
    console.log(routes)
    return (
      <Provider store={store}>
        <HashRouter>
          <GlobalStyle></GlobalStyle>
          <IconStyle></IconStyle>
          <Data>
            { renderRoutes (routes) }
          </Data>
        </HashRouter>
      </Provider>
    )
  }
}

export default App
