import request from '@/util/request'

export function logout () {
  return request.post('auth-api/api/logout')
}
