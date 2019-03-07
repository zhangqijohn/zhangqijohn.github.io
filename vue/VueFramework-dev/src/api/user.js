import request from '@/util/request'

export function getContext (appId) {
  return request.get('user-api/api/users/apps/' + appId + '/context')
}
