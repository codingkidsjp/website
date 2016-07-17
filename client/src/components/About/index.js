// @flow
import React from 'react'
import { connect } from 'react-redux'
import Scroll from 'react-scroll'
import Helmet from 'react-helmet'
import ReactMarkdown from 'react-markdown'

import style from './index.css'

import logo from '../assets/logo.svg'
import content from './content.md'

class About extends React.Component {
  componentDidMount () {
    Scroll.animateScroll.scrollToTop({duration: 0})
  }
  render () {
    return (
      <section className={style.section}>
        <Helmet title="CodingKidsについて" />
        <h1 className={style.title}>
          <img src={logo} width="400" alt="CodingKidsについて" />
        </h1>
        <div className={style.content}>
          <ReactMarkdown source={content} />
        </div>
      </section>
    )
  }
}
export default connect(state => state)(About)
