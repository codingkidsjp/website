// @flow
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import ga from 'react-ga'

import 'picturefill'
import 'picturefill/dist/plugins/mutation/pf.mutation'

import createStore from './store'
import routes from './routes'

const initialState = window.__INITIAL_STATE__ || {}
const store = createStore(initialState)
const history = syncHistoryWithStore(browserHistory, store)

ga.initialize('UA-72549134-1')
const logPageView = () => ga.pageview(window.location.pathname)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} onUpdate={logPageView} />
  </Provider>,
  document.getElementById('root')
)
