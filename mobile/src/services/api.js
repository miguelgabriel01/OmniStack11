import axios from 'axios';//importa o axios que faz a conexão com a api

const api = axios.create({
    baseURL: 'http://192.168.0.7:3333'
});

export default api;//faz a exṕortação da api