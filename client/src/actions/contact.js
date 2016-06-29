// @flow
export const CONTACT_OPEN = 'CONTACT_OPEN'
export const contactOpen = (data: Object) => ({ type: CONTACT_OPEN, data })

export const CONTACT_CONFIRM = 'CONTACT_CONFIRM'
export const contactConfirm = () => ({ type: CONTACT_CONFIRM })

export const CONTACT_SUBMIT = 'CONTACT_SUBMIT'
export const contactSubmit = (data: Object) => ({ type: CONTACT_SUBMIT, data })

export const CONTACT_CANCEL = 'CONTACT_CANCEL'
export const contactCancel = () => ({ type: CONTACT_CANCEL})

export const CONTACT_SUCCESS = 'CONTACT_SUCCESS'
export const contactSuccess = () => ({ type: CONTACT_SUCCESS })

export const CONTACT_FAILED = 'CONTACT_FAILED'
export const contactFailed = (error: string) => ({ type: CONTACT_FAILED, error })
