// @flow
import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import config from '../../config'
import style from './index.css'

import Header from '../Header'
import Footer from '../Footer'

const App = (props: Object) =>
  <div>
    <Helmet
      titleTemplate={`%s - ${config.sitename}`}
      defaultTitle={config.sitename}
      meta={[
        { name: 'description', content: config.description },
        { name: 'keywords', content: config.keywords },
        { property: 'fb:app_id', content: config.fb.appId },
        { property: 'og:site_name', content: config.sitename },
        { property: 'og:title', content: config.sitetitle },
        { property: 'og:image', content: `${config.siteurl}/og_image.jpg` },
        { property: 'og:description', content: config.description },
        { property: 'og:url', content: config.siteurl },
        { property: 'og:type', content: 'website' }
      ]}
      link={[
        { rel: 'canonical', href: config.siteurl }
      ]}
    />
    <div className={style.main}>
      {props.location.pathname !== '/' && <Header {...props} />}
      {props.children}
    </div>
    <Footer {...props} />
  </div>

export default connect(state => state)(App)
