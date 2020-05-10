import axios from 'axios';//importa o axios que é responsavel por fazer o front, consumir a api

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export default api;