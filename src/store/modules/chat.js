import { joinRandomRoom, createRoom, leaveRoom } from '@/api/chat'
import { createUniqueString } from '@/utils/createUniqueString'

const chat = {
  state: {
    userId: '',
    target: '',
    room: '',
    status: 'disconnect', // matching matched connected disconnected
    messages: [
      {
        mid: '00',
        source: 'server',
        timestamp: new Date(),
        content: 'You are chatting with a random stranger.'
      },
      {
        mid: '01',
        source: 'own',
        timestamp: new Date(),
        content: 'Message from own client.'
      },
      {
        mid: '02',
        source: 'stranger',
        timestamp: new Date(),
        content: 'Message from stranger client.'
      },
      {
        mid: '03',
        source: 'stranger',
        timestamp: new Date(),
        content:
          'Message from stranger client.\nHere is some very very very very very very long message.'
      },
      {
        mid: '04',
        source: 'own',
        timestamp: new Date(),
        content:
          'Message from stranger client.\nHere is some very very very very very very long message.'
      }
    ],
    modal: {
      name: '',
      componentProp: {},
      modalParam: {},
      eventListeners: {},
      timestamp: '' // 用于触发watch事件
    }
  },
  mutations: {
    SET_USER_ID: (state, id) => {
      state.userId = id
    },
    SET_TARGET: (state, id) => {
      state.target = id
    },
    SET_ROOM_ID: (state, id = '') => {
      state.room = id
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    ADD_MESSAGES: (state, content) => {
      state.messages.push(content)
    },
    SET_MODAL: (
      state,
      {
        name,
        componentProp = {},
        modalParam = {
          width: '85%',
          height: 'auto'
        },
        eventListeners = {}
      }
    ) => {
      state.modal = {
        name,
        componentProp,
        modalParam,
        eventListeners
      }
    }
  },
  actions: {
    async joinRandomRoom({ dispatch, commit, state }) {
      if (!state.userId.length) {
        const userId = await createUniqueString()
        commit('SET_USER_ID', userId)
      }
      const res = await joinRandomRoom(state.userId)
      let { code, message, data } = res.data
      if (code) {
        return { code, message }
      }
      if (message === 'Join failed, please create a room.') {
        return await dispatch('createRoom')
      }
      commit('SET_ROOM_ID', data.room)
      // status 为 connected 时从 clients 获取
      // commit('SET_TARGET', data.target)
      commit('SET_STATUS', 'matched')
      return { code, message }
    },
    async createRoom({ commit, state }) {
      const res = await createRoom(state.userId)
      let { code, message, data } = res.data
      if (code) {
        return { code, message }
      }
      if (message === 'Already join a room.') {
        return { code, message }
      }
      commit('SET_ROOM_ID', data.room)
      commit('SET_STATUS', 'matching')
      return { code, message }
    },
    async leaveRoom({ commit, state }) {
      const res = await leaveRoom(state.userId)
      let { code, message } = res.data
      if (code) {
        return { code, message }
      }
      if (message === 'Can not leave the room before joined the room.') {
        return { code, message }
      }
      commit('SET_ROOM_ID')
      commit('SET_STATUS', 'disconnected')
      return { code, message }
    },
    addHistory({ commit }, message) {
      commit('ADD_MESSAGES', message)
    },
    setTarget({ commit }, id) {
      commit('SET_TARGET', id)
    },
    setStatus({ commit }, status) {
      commit('SET_STATUS', status)
    },
    setModal({ commit }, modal) {
      commit('SET_MODAL', modal)
    }
  }
}

export default chat
