import request from '@/utils/request'

export function login(username, password, uuid, code) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password,
      uuid,
      code
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
