import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import news from './news'
import contact from './contact'

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  news,
  contact
})

export default rootReducer
