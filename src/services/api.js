import axios from 'axios';

export default api = axios.create({
    baseURL: 'https://viacep.com.br/ws'
});