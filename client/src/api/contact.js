// @flow
import 'whatwg-fetch'
import config from '../config'

/*
import fetchJsonp from 'fetch-jsonp'
export function __contact (data: Object) {
  return fetchJsonp(config.api.contact, {body: JSON.stringify(data)})
  .then(res => res.json())
  .then(() => {
    return true
  })
}
*/

export function contact (data: Object) {
  return fetch(config.api.contact, {
    method: 'POST',
    body: JSON.stringify(data),
    mode: 'cors'
  })
  .then(res => res.json())
  .then(() => {
    return true
  })
}

/*
export function _contact (data: Object) {
  return postGAS(config.api.contact, data)
  .then(() => {
    return true
  })
}

function postGAS (url: string, data: Object) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url) // 'http://httpstat.us/500'
    // xhr.withCredentials = true
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onloadend = () => {
      const response = 'response' in xhr ? xhr.response : xhr.responseText
      if (!xhr.status || xhr.status >= 200 && xhr.status < 300) {
        return resolve(response)
      }
      return reject(new Error('Network request failed'))
    }
    xhr.ontimeout = () => {
      return reject(new Error('Network request timeout'))
    }
    xhr.send(JSON.stringify(data))
  })
}
*/
