// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Waypoint from 'react-waypoint'
import moment from 'moment'

import style from './index.css'
import Action from '../../actions'

import title from '../News/assets/news-title.svg'

const List = (props: Object) => {
  const {list, isLoading, hasMore, offset, total} = props.news
  return (
    <section className={style.section}>
      <h1 className={style.title}>
        <img src={title} width="112" height="37" />
      </h1>
      <div className={style.content}>
        <div className={style.list} >
          {list && list.map(v => {
            return (
              <Link to={`/post/${v.id}`} key={v.id}>
                <b className={style.newsdate}>{moment(v.date).format('YYYY-MM-DD')}</b>
                <span className={style.newstitle}>{v.title}</span>
              </Link>
            )
          })}
        </div>
        {hasMore && (isLoading ? <div className={style.loader} /> : <Waypoint onEnter={() => props.dispatch(Action.getPosts(offset))} threshold={1000} />)}
        <div className={style.footer}>
          <div className={style.date}>全 {total} 件</div>
        </div>
      </div>
    </section>
  )
}
// export default Post
export default connect(state => state)(List)
