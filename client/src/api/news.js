// @flow
// import 'whatwg-fetch'
import fetchJsonp from 'fetch-jsonp'
import config from '../config'

export function getPosts (offset: number|null) {
  const query = `api_key=${config.tumblr.key}&offset=${offset || 0}&limit=10`
  return fetchJsonp(`${config.tumblr.url}?${query}`)
  .then(res => res.json())
  .then(data => {
    if (data.meta.status !== 200) throw new Error('Network request failed')
    return {list: data.response.posts, total: data.response.total_posts}
  })
}

export function getPost (id: string) {
  const query = `api_key=${config.tumblr.key}&id=${id}`
  return fetchJsonp(`${config.tumblr.url}?${query}`)
  .then(res => res.json())
  .then(data => {
    if (data.meta.status !== 200) throw new Error('Network request failed')
    if (!data.response.posts) throw new Error('Not found post')
    return data.response.posts[0]
  })
}

/*
export function getNews (offset = 0) {
  const url = config.tumblr.url + '?api_key=' + config.tumblr.key + '&offset=' + offset
  return fetch(url)
  .then(res => res.json())

  fetch(url, {} , function(err, res) {
    console.log(err, res);
    var blogInfo = res.response.blog;
    var articles = res.response.posts;
    // blog の情報 , articles(Array) を送る
    TumblrActionCreators.addArticle(blogInfo, articles, offset);
  });
}
*/
