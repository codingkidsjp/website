// @flow
import React from 'react'
import style from './index.css'

import logo from '../Header/assets/logo-main.svg'
import lead1 from './assets/lead01.svg'

import img1 from './assets/top-img1.jpg'
import wave from './assets/top-wave.svg'

export default () =>
  <header className={style.header}>
    <div className={style.photo} style={{backgroundImage: `url(${img1})`}}>
      <div className={style.lead}>
        <img src={lead1} />
      </div>
    </div>
    <div className={style.title} style={{backgroundImage: `url(${wave})`}}>
      <div className={style.logo}>
        <img src={logo} />
      </div>
    </div>
  </header>
