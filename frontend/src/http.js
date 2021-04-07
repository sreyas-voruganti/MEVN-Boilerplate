import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8000' // The base URL for your api
})

export default http
