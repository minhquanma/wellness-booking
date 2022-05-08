import axios from 'axios'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    // perform a task before the request is sent
    return config
  },
  (error) => {
    // handle the error
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    // do something with the response data
    return response.data
  },
  (error) => {
    // handle the response error
    return Promise.reject(error)
  }
)

export default axiosInstance
