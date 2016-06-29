// @flow
import React from 'react'
import Helmet from 'react-helmet'

import style from './index.css'
import error from './assets/404.svg'

export default () => {
  return (
    <section className={style.section}>
      <Helmet title="Error" />
      <h1 className={style.title}>
        <img src={error} width="400" alt="Page Not Found" />
      </h1>
    </section>
  )
}
