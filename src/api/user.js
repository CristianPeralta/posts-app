import axios from '../axios';

export const getProfile = username => {
    return axios.get('/users', { params: { username: username }})
        .then(response => response.data);
};
