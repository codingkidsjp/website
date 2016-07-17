// @flow
import React from 'react'
import Scroll from 'react-scroll'
import { Link } from 'react-router'
import moment from 'moment'

import style from './index.css'
import bg from './assets/news.bg.svg'
import newsBtnAll from './assets/news-btn-all.svg'
import title from './assets/news-title.svg'

import bannerSchool from './assets/banner-school.png'
import bannerSchoolRetina from './assets/banner-school@2x.png'
import bannerEvent from './assets/banner-event.png'
import bannerEventRetina from './assets/banner-event@2x.png'
import bannerPhone from './assets/banner-phone.png'
import bannerPhoneRetina from './assets/banner-phone@2x.png'

const ScrollLink = Scroll.Link

export default (props: Object) => {
  const {news} = props
  return (
    <section id="news" className={style.section} style={{backgroundImage: `url(${bg})`}}>
      <div className={style.container}>
        <div className={style.banners}>
          <ul>
            <li><ScrollLink to="school" smooth><img
              src={bannerSchool}
              srcSet={`${bannerSchool} 1x, ${bannerSchoolRetina} 2x`}
            /></ScrollLink></li>
            <li><ScrollLink to="event" smooth><img
              src={bannerEvent}
              srcSet={`${bannerEvent} 1x, ${bannerEventRetina} 2x`}
            /></ScrollLink></li>
            <li><ScrollLink to="phone" smooth><img
              src={bannerPhone}
              srcSet={`${bannerPhone} 1x, ${bannerPhoneRetina} 2x`}
            /></ScrollLink></li>
          </ul>
        </div>
        <div className={style.news}>
          <h1 className={style.title}>
            <img src={title} width="112" height="37" />
            <Link to="/post" style={{paddingLeft:'2em'}}><img src={newsBtnAll} width="70" height="19" /></Link>
          </h1>
          <div className={style.content}>
            <div className={style.list}>
              {news.list.map((v, i) => {
                if (i > 10) return null
                return (
                  <Link to={`/post/${v.id}`} key={v.id}>
                    <b className={style.newsdate}>{moment(v.date).format('MM/DD')}</b>
                    <span className={style.newstitle}>{v.title}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
