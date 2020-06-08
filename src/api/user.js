import axios from '../axios';

export const getProfile = username => {
    return axios.get('/users', { params: { username: username }})
        .then(response => response.data);
};

export const fetchUserMessages = username => {
    return axios.get('/users/messages', {params: {username: username}})
        .then(response => response.data);
};

export const deleteMessages = mid => {
    return axios.delete('/users/messages', { data: { mid: mid }})
        .then(response => response.data);
};

export const sendMessage = data => {
    return axios.post('/users/messages', data)
        .then(response => response.data);
};

export const registerUser = data => {
    return axios.post('/users', data)
        .then(response => response.data);
};
