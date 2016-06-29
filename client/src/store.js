import { applyMiddleware, createStore, compose } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'

export default (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  const router = routerMiddleware(browserHistory)
  const logger = createLogger({
    collapsed: true,
    predicate: () => process.env.NODE_ENV === 'development'
  })
  const enhancer = compose(
    applyMiddleware(sagaMiddleware, router, logger),
    (typeof window === 'object' && window.devToolsExtension) ? window.devToolsExtension() : f => f
  )
  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  )
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  sagaMiddleware.run(rootSaga)
  return store
}
