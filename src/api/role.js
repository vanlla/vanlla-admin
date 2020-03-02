import request from '@/utils/request'

export function fetchRoleList(query) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: query
  })
}

export function fetchRole(id) {
  return request({
    url: '/system/role/info/' + id,
    method: 'get'
  })
}

export function saveRole(data) {
  return request({
    url: '/system/role/save',
    method: 'post',
    data
  })
}

export function updatRole(data) {
  return request({
    url: '/system/role/update',
    method: 'put',
    data
  })
}

export function deleteRole(data) {
  return request({
    url: '/system/role/delete',
    method: 'delete',
    data
  })
}

export function fetchRoleAll() {
  return request({
    url: '/system/role/listAll',
    method: 'get'
  })
}