import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      window.location.href = error.response.data.message + window.location.href
    } else {
      this.$message.error(error.response.data.message)
    }

    return Promise.reject(error)
  }
)

export default service
