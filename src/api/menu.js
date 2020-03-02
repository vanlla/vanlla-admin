import request from '@/utils/request'

export function fetchMenuList(query) {
  return request({
    url: '/system/menu/list',
    method: 'get',
    params: query
  })
}

export function fetchMenu(id) {
  return request({
    url: '/system/menu/info/' + id,
    method: 'get'
  })
}

export function saveMenu(data) {
  return request({
    url: '/system/menu/save',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: '/system/menu/update',
    method: 'put',
    data
  })
}

export function deleteMenu(data) {
  return request({
    url: '/system/menu/delete',
    method: 'delete',
    data
  })
}

export function findByType(typeId) {
  return request({
    url: '/system/menu/type/' + typeId,
    method: 'get'
  })
}

export function findByParentId(parentId) {
  return request({
    url: '/system/menu/parent/' + parentId,
    method: 'get'
  })
}

export function getTree() {
  return request({
    url: '/system/menu/tree',
    method: 'get'
  })
}
