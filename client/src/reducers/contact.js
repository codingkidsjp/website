// @flow
import update from 'react-addons-update'
import Action from '../actions'

const initialState = {
  initialValues: {},
  isConfirm: false,
  isSending: false,
  isSuccess: false,
  errorMsg: null
}

export default function (state: Object = initialState, action: Object) {
  switch (action.type) {

    case Action.CONTACT_OPEN:
      return update(state, {
        $merge: {
          initialValues: action.data || {},
          isConfirm: false,
          isSending: false,
          isSuccess: false,
          errorMsg: null
        }
      })

    case Action.CONTACT_CONFIRM:
      return update(state, {
        $merge: {
          isConfirm: true,
          isSending: false,
          errorMsg: null
        }
      })

    case Action.CONTACT_SUBMIT:
      return update(state, {
        $merge: {
          savedEmail: action.data.email,
          isConfirm: true,
          isSending: true,
          errorMsg: null
        }
      })

    case Action.CONTACT_CANCEL:
      return update(state, {
        $merge: {
          isConfirm: false,
          isSending: false,
          errorMsg: null
        }
      })

    case Action.CONTACT_SUCCESS:
      return update(state, {
        $merge: {
          isConfirm: false,
          isSending: false,
          isSuccess: true,
          errorMsg: null
        }
      })

    case Action.CONTACT_FAILED:
      return update(state, {
        $merge: {
          isConfirm: true,
          isSending: false,
          isSuccess: false,
          errorMsg: action.error
        }
      })

    default:
      return state
  }
}
