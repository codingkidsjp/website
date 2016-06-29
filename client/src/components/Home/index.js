// @flow
import React from 'react'
import Scroll from 'react-scroll'
import { connect } from 'react-redux'

import Top from '../Top'
import News from '../News'
import School from '../School'
import Event from '../Event'
import Phone from '../Phone'
import Contact from '../Contact'

class Home extends React.Component {
  componentDidMount () {
    if (this.props.location.hash) {
      const hash = this.props.location.hash.replace(/#/, '')
      Scroll.scroller.scrollTo(hash, {duration: 500, delay: 500, smooth: true})
    }
  }
  render () {
    const props = this.props
    return (
      <div>
        <Top {...props} />
        <News {...props} />
        <School {...props} />
        <Event {...props} />
        <Phone {...props} />
        <Contact {...props} />
      </div>
    )
  }
}

export default connect(state => state)(Home)
