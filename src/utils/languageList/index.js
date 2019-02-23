import languageList from './languageList.json'

export const listForSelect = languageList.map(item => {
  return {
    'value': item.code,
    'label': item.name
  }
})

