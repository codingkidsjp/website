// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Scroll from 'react-scroll'
import Helmet from 'react-helmet'
import moment from 'moment'

import Action from '../../actions'
import style from './index.css'
import robo from '../assets/robo.svg'

class Post extends React.Component {
  componentWillMount () {
    this.props.dispatch(Action.getPost(this.props.params.id))
  }
  componentDidMount () {
    Scroll.animateScroll.scrollToTop()
  }
  render () {
    const {data, isLoading, errorMsg} = this.props.news.item
    return (
      <section className={style.section}>
        <Helmet title={data.title} />
        {isLoading ? <div className={style.loader} /> : (
          <div>
            <div className={style.breadcrumb}>
              <Link to="/"><img src={robo} /></Link>
              &nbsp;&raquo;&nbsp;
              <Link to="/post">ニュース</Link>
              &nbsp;&raquo;&nbsp;
              <a className={style.active}>{data.title}</a>
            </div>
            <h1 className={style.title}>
              {data.title}
            </h1>
            <div className={style.content} dangerouslySetInnerHTML={{__html: data.body}} />
            <div className={style.footer}>
              <div className={style.back}><Link to="/post">&laquo; ニュース一覧に戻る</Link></div>
              <div className={style.date}>{moment(data.date).format('YYYY年MM月DD日')}</div>
            </div>
          </div>
        )}
        {errorMsg && <p className={style.errorMsg}>{errorMsg}</p>}
      </section>
    )
  }
}
export default connect(state => state)(Post)
