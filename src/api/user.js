import request from '@/utils/request'

export function fetchUserList(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}

export function fetchUser(id) {
  return request({
    url: '/system/user/info/' + id,
    method: 'get'
  })
}

export function saveUser(data) {
  return request({
    url: '/system/user/save',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/system/user/update',
    method: 'put',
    data
  })
}

export function updatePassword(data) {
  return request({
    url: '/system/user/updatePassword',
    method: 'put',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/system/user/delete',
    method: 'delete',
    data
  })
}
