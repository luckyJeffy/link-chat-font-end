import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:8080/api', // api 的 base_url
  timeout: 5000000, // request timeout
  withCredentials: true // Only enable in the development environment
})

// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error) // for debug
    // this.$Message.error(error.message) // 不可用
    return Promise.reject(error)
  }
)

export default service
