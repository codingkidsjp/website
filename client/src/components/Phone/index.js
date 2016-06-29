// @flow
import React from 'react'
import style from './index.css'

import titleBg from './assets/phone-title-bg.svg'
import title from './assets/phone-title.svg'
import desc from './assets/phone-desc.svg'
import dotbar from './assets/dot-bar.svg'

export default () =>
  <section id="phone" name="phone" className={style.section} style={{backgroundImage: `url(${titleBg})`}}>
    <h2 className={style.title}>
      <img src={title} />
    </h2>
    <div className={style.content} style={{backgroundImage: `url(${dotbar}), url(${dotbar})`}}>
      <img src={desc} />
    </div>
    <div className={style.info}>
      毎週土曜日 9:30〜10:00 <small>会費1,000円</small>
    </div>
    <nav className={style.nav}>
      お気軽にお越しください
    </nav>
  </section>
