import axios from '../axios';

export const fetchUserPosts = username => {
    return axios.get('/posts', { params: { username: username }})
        .then(response => response.data);
};