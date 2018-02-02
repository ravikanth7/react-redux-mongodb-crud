import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

export default function callApi(endpoint, method = 'get', cache = false, body) {
  // if (cache == true && method == 'get') {
  //   if (sessionStorage.getItem(endpoint) != undefined) {
  //     return Promise.resolve(JSON.parse(sessionStorage.getItem(endpoint)));
  //   }
  // }
  const token = localStorage.getItem('_u_t');
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    method,
    body: JSON.stringify(body),
    credentials: 'same-origin'
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    // if (cache == true && method == 'get') {
    //   sessionStorage.setItem(endpoint, JSON.stringify(json));
    // }

    return json;
  });
}
