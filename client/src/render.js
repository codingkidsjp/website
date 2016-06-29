// @flow
import 'babel-polyfill'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { createMemoryHistory } from 'history'
import Helmet from 'react-helmet'
import jade from 'jade'

import createStore from './store'
import routes from './routes'

export default (locals: Object, callback: (err: Object|null, res: string|null) => void) => {
  console.log(locals)
  const memoryHistory = createMemoryHistory()
  const store = createStore()
  const history = syncHistoryWithStore(memoryHistory, store)
  const location = history.createLocation(locals.path)
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (!error && !redirectLocation && renderProps) {
      console.log(renderProps)
      const content = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )
      const data = {
        content: content,
        state: null,  // JSON.stringify(store.getState()),  // Maybe no need on simple site.
        head: Helmet.rewind()
      }
      const template = jade.compile(locals.template)
      return callback(null, template(data))
    }
    return callback(error || redirectLocation, '')
  })
}
