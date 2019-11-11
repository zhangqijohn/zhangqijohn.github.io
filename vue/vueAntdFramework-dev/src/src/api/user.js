import request from '@/utils/request'

export function getContext () {
  return request({
    url: '/api/proxy/users/context',
    method: 'get'
  })
}

export function logout () {
  return request.post('/api/proxy/users/logout')
}
