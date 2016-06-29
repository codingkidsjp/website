// @flow
import _ from 'lodash'
import { takeLatest } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'
import Action from '../actions'
import Api from '../api'

function * landing () {
  yield put(Action.landing())
  yield put(Action.getPosts(0))
}

function * getPosts () {
  yield * takeLatest(Action.GET_POSTS, function * (action) {
    try {
      const res: any = yield call(Api.getPosts, action.offset)
      yield put(Action.getPostsSuccess(res.list, res.total))
    } catch (e) {
      yield put(Action.getPostsFailed(e.message))
    }
  })
}

function * getPost () {
  yield * takeLatest(Action.GET_POST, function * (action) {
    if (!action.id) return
    try {
      const item: any = yield select(state => state.news.items[action.id])
      if (_.has(item, 'id')) {
        yield put(Action.getPostSuccess(item))
      } else {
        const post: any = yield call(Api.getPost, action.id)
        yield put(Action.getPostSuccess(post))
      }
    } catch (e) {
      yield put(Action.getPostFailed(e.message))
    }
  })
}

function * contactSubmit () {
  yield * takeLatest(Action.CONTACT_SUBMIT, function * (action) {
    try {
      yield call(Api.contact, action.data)
      yield put(Action.contactSuccess())
    } catch (e) {
      yield put(Action.contactFailed(e.message))
    }
  })
}

export default function * () :any {
  yield [
    getPosts(),
    getPost(),
    contactSubmit(),
    landing()
  ]
}
