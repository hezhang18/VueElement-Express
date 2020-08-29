import axios from 'axios'
import {Message} from 'element-ui'

const http = axios.create({
    baseURL: 'http://localhost:3000/user'
})

http.interceptors.request.use( config => {
    if(sessionStorage.elementToken) {
        config.headers.Authorization = sessionStorage.elementToken
    }

    return config
})

http.interceptors.response.use( res => {
    return res
}, err => {
    Message.error(err.response.data)
})

export default http