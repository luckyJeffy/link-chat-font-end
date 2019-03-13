import request from '@/utils/request'

export const createRoom = userId => {
  const data = { userId }
  return request({
    url: '/chat/createRoom',
    method: 'post',
    data
  })
}

export const joinRandomRoom = userId => {
  const data = { userId }
  return request({
    url: '/chat/joinRandomRoom',
    method: 'post',
    data
  })
}

export const leaveRoom = userId => {
  const data = { userId }
  return request({
    url: '/chat/leaveRoom',
    method: 'post',
    data
  })
}
