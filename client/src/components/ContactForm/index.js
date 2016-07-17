// @flow
import React from 'react'
import {reduxForm} from 'redux-form'
import Scroll from 'react-scroll'
import Helmet from 'react-helmet'
import _ from 'lodash'

import style from './index.css'
import Action from '../../actions'

const titles = [
  {
    key: 'school',
    title: 'プログラミング教室への入会お申し込み',
    placeholder: '参加可能日、特に勉強したい内容等がありましたらご記入ください。'
  }, {
    key: 'event',
    title: 'イベントへの参加お申し込み',
    placeholder: 'ご希望の日程とお名前をご記入ください。'
  }, {
    key: 'scratch',
    title: 'スクラッチJr.体験会への参加お申し込み',
    placeholder: 'ご希望の日程とお名前をご記入ください。'
  }, {
    key: 'about',
    title: '教室・体験会についてのご質問',
    placeholder: 'ご質問内容を詳しくご記入ください。'
  }, {
    key: 'advise',
    title: 'IT導入支援についてのご相談',
    placeholder: 'ご相談内容を詳しくご記入ください。'
  }, {
    key: 'contact',
    title: 'その他のご相談・お問い合わせ',
    placeholder: 'お問い合わせ内容を詳しくご記入ください。'
  }
]

class ContactForm extends React.Component {
  componentWillMount () {
    let hash = this.props.location.hash ? this.props.location.hash.replace(/#/, '') : null
    if (this.props.location.pathname.match(/\/entry\/?/)) hash = 'event'
    if (this.props.location.pathname.match(/\/regist\/?/)) hash = 'school'
    const data = hash ? {title: titles[_.findIndex(titles, {key: hash})].title} : {}
    this.props.dispatch(Action.contactOpen(data))
  }
  componentDidMount () {
    Scroll.animateScroll.scrollToTop({duration: 0})
  }
  handleCancel () {
    this.props.dispatch(Action.contactCancel())
  }
  handleConfirm (data, dispatch) {
    dispatch(Action.contactConfirm(data))
  }
  handleSubmit (data, dispatch) {
    dispatch(Action.contactSubmit(data))
  }
  render () {
    const {fields: {
      email,
      title,
      message
    }, handleSubmit} = this.props
    const {errorMsg, isConfirm, isSending, isSuccess} = this.props.contact
    return (
      <section className={style.section}>
        <Helmet title="お申し込み・お問い合わせ" />
        <h1 className={style.title}>
          お申し込み・お問い合わせ
        </h1>
        <div className={style.content}>
          {isSuccess ? (
            <div className={style.successBlock}>
              <h4>ありがとうございます</h4>
              <p>お申し込み・お問い合わせを承りました。<br />内容を確認次第、ご連絡させていただきます。</p>
            </div>
          ) : isConfirm ? (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <input type="hidden" {...email} />
              <input type="hidden" {...title} />
              <input type="hidden" {...message} />
              <p>以下の内容で送信いたします。よろしいですか？</p>
              <table className={style.confirm}>
                <tbody>
                  <tr>
                    <th>お問い合わせ</th>
                    <td>{title.value}</td>
                  </tr>
                  <tr>
                    <th>Eメール</th>
                    <td>{email.value}</td>
                  </tr>
                  <tr>
                    <th>メッセージ</th>
                    <td>{message.value}</td>
                  </tr>
                </tbody>
              </table>
              {errorMsg ? <div className={style.errorBlock}>{errorMsg}</div> : ''}
              <div className={style.actions}>
                <button className={style.button} type="button" onClick={() => this.handleCancel()}> いいえ、戻ります </button>
                <button className={style.buttonSubmit} data-sending={isSending} type="submit" disabled={isSending}> はい、送信します </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit(this.handleConfirm)}>
              <div className={style.control}>
                <span className={(title.touched && title.error) ? style.selectError : style.select}>
                  <select {...title}>
                    <option value="">お問い合わせ内容をお選びください</option>
                    {titles.map(val => {
                      return (
                        <option key={val.key}>{val.title}</option>
                      )
                    })}
                  </select>
                </span>
                {title.touched && title.error && <span className={style.errorMsg}>{title.error}</span>}
              </div>
              <div className={style.control}>
                <input
                  className={(email.touched && email.error) ? style.inputError : style.input}
                  placeholder="Eメール"
                  {...email}
                />
                {email.touched && email.error && <span className={style.errorMsg}>{email.error}</span>}
              </div>
              <div className={style.control}>
                <textarea
                  className={(message.touched && message.error) ? style.textareaError : style.textarea}
                  placeholder={title.value ? titles[_.findIndex(titles, {title: title.value})].placeholder : 'お問い合わせ内容をご記入ください。'}
                  {...message}
                />
                {message.touched && message.error && <span className={style.errorMsg}>{message.error}</span>}
              </div>
              <div className={style.actions}>
                <button className={style.buttonSubmit} type="submit"> 送信内容の確認 </button>
              </div>
            </form>
          )}
        </div>
      </section>
    )
  }
}

export default reduxForm(
  {
    form: 'ContactForm',
    fields: [
      'email',
      'title',
      'date',
      'message'
    ],
    validate: values => {
      const errors = {}
      if (!values.email) {
        errors.email = '入力が必要です'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = '正しいメールアドレスを入力してください'
      }
      if (!values.title) {
        errors.title = '入力が必要です'
      }
      if (!values.message) {
        errors.message = '入力が必要です'
      }
      return errors
    }
  },
  state => ({
    app: state.app,
    contact: state.contact,
    email: state.contact.savedEmail,
    initialValues: state.contact.initialValues
  })
)(ContactForm)
