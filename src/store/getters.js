const getters = {
  interest: state => state.app.interest,
  language: state => state.app.language,
  userId: state => state.chat.userId,
  target: state => state.chat.target,
  room: state => state.chat.room,
  status: state => state.chat.status,
  messages: state => state.chat.messages,
  modal: state => state.chat.modal
}

export default getters
