// @flow
import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import style from './index.css'

import List from './list'
import Item from './item'

const Post = (props: Object) => {
  const {id} = props.params
  return (
    <div className={style.container}>
      <Helmet title="News" />
      {id ? <Item {...props} /> : <List {...props} />}
    </div>
  )
}
export default connect(state => ({news: state.news}))(Post)
