import request from '@/utils/request'

export function uploadImage(image) {
  var formdata = new FormData()
  formdata.append('image', image)
  return request({
    url: '/fileUpload/image',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formdata
  })
}

export function deleteImage(url) {
  return request({
    url: '/fileUpload/delete',
    method: 'delete',
    params: { file: url }
  })
}
