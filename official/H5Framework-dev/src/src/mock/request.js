import axios from 'axios'
const request = axios.create({
    baseURL: '/',
    timeout: 120000
})
export default request