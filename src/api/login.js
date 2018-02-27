import request from '@/utils/request'
import axios from 'axios'
export function loginByUsername(username, password) {
  return axios({
    method: 'put',
    url: '/api/user/login',
    data: {
      'username': username,
      'password': password
    }
  })
}

export function logout() {
  return axios({
    url: '/api/user/logout',
    method: 'PUT'
  })
}

export function getUserInfo(token) {
  return axios({
    url: '/api/user',
    method: 'get',
    params: { token }
  })
}

