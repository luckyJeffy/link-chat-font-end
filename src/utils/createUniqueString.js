export const createUniqueString = () => {
  return new Promise((reslove, reject) => {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    reslove((+(randomNum + timestamp)).toString(32))
  })
}
