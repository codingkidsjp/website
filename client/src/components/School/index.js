// @flow
import React from 'react'
import { Link } from 'react-router'
import style from './index.css'

import title from './assets/school-title.svg'
import titleBg from './assets/school-title-bg.svg'

import feat1 from './assets/school-feat1.svg'
import feat2 from './assets/school-feat2.svg'
import feat3 from './assets/school-feat3.svg'
import feat4 from './assets/school-feat4.svg'
import feat5 from './assets/school-feat5.svg'
import feat6 from './assets/school-feat6.svg'

import course from './assets/school-course.svg'
import place from './assets/school-place.svg'
import hrbar from './assets/school-bar.bg.svg'

import btn from '../assets/text-entry.svg'

const features = [
  {title: feat1, text: '4歳からOK! わかりやすく 教えます'},
  {title: feat2, text: '学校帰りに 手ぶらで通えます'},
  {title: feat3, text: '成功体験で 自信がつきます'},
  {title: feat4, text: '世界中の プログラミング 教材を使います'},
  {title: feat5, text: 'IT知識と良識を 育てます'},
  {title: feat6, text: 'タイピングや パソコンの基本操作 も学べます'}
]

export default () =>
  <section id="school" className={style.section} style={{backgroundImage: `url(${titleBg})`}}>
    <h1 className={style.title}>
      <img src={title} />
    </h1>
    <div className={style.content}>
      <div className={style.features}>
        {features.map((val, key) => {
          return (
            <div key={key} className={style.col}>
              <h2><img src={val.title} /></h2>
              <p dangerouslySetInnerHTML={{__html: val.text.replace(/\s/g, '<br />')}} />
            </div>
          )
        })}
      </div>
      <hr className={style.hr} style={{backgroundImage: `url(${hrbar})`}} />
      <div className={style.info}>
        <div className={style.course}>
          <img src={course} />
        </div>
        <div className={style.place}>
          <img src={place} />
        </div>
      </div>
    </div>
    <nav className={style.nav}>
      <Link to="/contact#school"><img src={btn} /></Link>
    </nav>
  </section>
