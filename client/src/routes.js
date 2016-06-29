import React from 'react'
import { Route, IndexRoute } from 'react-router'

/* container */
import App from './components/App'
import Home from './components/Home'
import Post from './components/Post'
import Contact from './components/ContactForm'
import About from './components/About'
import Error from './components/Error'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="regist" component={Contact} />{/* Legacy URL */}
    <Route path="entry" component={Contact} />{/* Legacy URL */}
    <Route path="contact" component={Contact} />
    <Route path="post" component={Post} />
    <Route path="post/:id" component={Post} />
    <Route path="about" component={About} />
    <Route status={404} path="*" component={Error} />
  </Route>
)
