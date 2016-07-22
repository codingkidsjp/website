// @flow
import React from 'react'
import { Link } from 'react-router'
import style from './index.css'

import desc from './assets/event-desc.svg'
import bg from './assets/event-title-bg.svg'
import title from './assets/event-title.svg'
import gallery from './assets/screens.jpg'

import btn from '../assets/text-entry.svg'

export default () =>
  <section id="event" className={style.section} style={{backgroundImage: `url(${bg})`}} >
    <h1 className={style.title}>
      <img src={title} />
    </h1>
    <div className={style.content}>
      <div className={style.desc}>
        <img src={desc} />
      </div>
      <div className={style.gallery} style={{backgroundImage: `url(${gallery})`}} />
    </div>
    <nav className={style.nav}>
      <Link to="/contact#scratch"><img src={btn} /></Link>
    </nav>
  </section>
