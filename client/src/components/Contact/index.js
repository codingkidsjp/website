// @flow
import React from 'react'
import { Link } from 'react-router'
import style from './index.css'

import titleBg from './assets/contact-title-bg.svg'
import title from './assets/contact-title.svg'
import about from './assets/contact-about.svg'

import btn from '../assets/text-contact.svg'

export default () =>
  <section id="contact" className={style.section} style={{backgroundImage: `url(${titleBg})`}}>
    <h2 className={style.title}>
      <img src={title} />
    </h2>
    <nav className={style.nav}>
      <Link to="/contact" className={style.btn}><img src={btn} /></Link>
      <Link to="/about" className={style.about}><img src={about} /></Link>
    </nav>
  </section>
