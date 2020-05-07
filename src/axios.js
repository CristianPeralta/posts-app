import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://http://localhost:5000/'
});

export default instance;