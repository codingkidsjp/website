// @flow
import React from 'react'
import { Link } from 'react-router'

import style from './index.css'
import logo from './assets/logo-main.svg'

const menus = [
  {title: 'プログラミング教室', url: '/'},
  {title: 'お申し込み・お問い合わせ', url: '/contact'},
  {title: 'ニュース', url: '/post'},
  {title: 'CodingKidsについて', url: '/about'}
]

export default () =>
  <header className={style.header}>
    <div className={style.logo}>
      <Link to="/" >
        <img src={logo} />
      </Link>
    </div>
    <ul className={style.nav}>
      {menus.map((val, key) => {
        return (
          <li key={key}>
            <Link to={val.url}>{val.title}</Link>
          </li>
        )
      })}
    </ul>
  </header>
