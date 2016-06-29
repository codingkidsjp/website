// @flow
import _ from 'lodash'
import update from 'react-addons-update'
import Action from '../actions'

const initialState = {
  list: [],
  items: {},
  item: {
    data: {},
    isLoading: false,
    errorMsg: null
  },
  hasMore: false,
  offset: 0,
  total: 0,
  isLoading: false,
  errorMsg: null
}

export default function (state: Object = initialState, action: Object) {
  switch (action.type) {

    case Action.GET_POSTS:
      return update(state, {
        $merge: {
          isLoading: true,
          isSuccess: false,
          errorMsg: null
        }
      })

    case Action.GET_POSTS_SUCCESS:
      const items = state.items
      action.list.map(v => {
        items[v.id] = v
      })
      const list = _.chain(items).map(v => {
        return {
          id: v.id,
          date: v.date,
          title: v.title
        }
      }).sortBy('date').reverse().value()

      return update(state, {
        $merge: {
          list: list,
          items: items,
          offset: Object.keys(items).length,
          hasMore: (action.list.length === 10),
          total: action.total,
          isLoading: false,
          errorMsg: null
        }
      })

    case Action.GET_POSTS_FAILED:
      return update(state, {
        $merge: {
          isLoading: false,
          isSuccess: false,
          errorMsg: action.error
        }
      })

    case Action.GET_POST:
      return update(state, {
        item: {$merge: {
          isLoading: true,
          isSuccess: false,
          errorMsg: null
        }}
      })

    case Action.GET_POST_SUCCESS:
      return update(state, {
        item: {$merge: {
          data: action.item,
          isLoading: false,
          isSuccess: true,
          errorMsg: null
        }},
        items: {
          [action.item.id]: {$set: action.item}
        }
      })

    case Action.GET_POST_FAILED:
      return update(state, {
        item: {$merge: {
          isLoading: true,
          isSuccess: false,
          errorMsg: action.error
        }}
      })

    default:
      return state
  }
}
