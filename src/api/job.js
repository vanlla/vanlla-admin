import request from '@/utils/request'

let prefix = '/quartz/job'

export function fetchJobList(query) {
  return request({
    url: prefix + '/list',
    method: 'get',
    params: query
  })
}

export function fetchJob(id) {
  return request({
    url: prefix + '/info/' + id,
    method: 'get'
  })
}

export function saveJob(data) {
  return request({
    url: prefix + '/save',
    method: 'post',
    data
  })
}

export function updateJob(data) {
  return request({
    url: prefix + '/update',
    method: 'put',
    data
  })
}

export function deleteJob(data) {
  return request({
    url: prefix + '/delete',
    method: 'delete',
    data
  })
}

export function fetchJobAll() {
  return request({
    url: prefix + '/listAll',
    method: 'get'
  })
}

export function hasClassName(query) {
  return request({
    url: prefix + '/has',
    method: 'get',
    params: query
  })
}

export function updateEnable(id, enable) {
  return request({
    url: prefix + '/updateEnable',
    method: 'get',
    params: { id: id, enable: enable }
  })
}
