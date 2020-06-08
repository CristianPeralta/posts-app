import axios from '../axios';

export const fetchUserPosts = username => {
    return axios.get('/posts', { params: { username: username }})
        .then(response => response.data);
};

export const fetchPosts = query => {
    return axios.get('/posts', { params: query})
        .then(response => response.data);
};

export const addPost = data => {
    return axios.post('/posts', data)
        .then(response => response.data);
};

export const editPost = data => {
    return axios.put('/posts', data)
        .then(response => response.data);
};

export const fetchPostComments = params => {
    return axios.get('/posts/comments', { params: params })
        .then(response => response.data);
};

export const addPostComment = data => {
    return axios.post('/posts/comments', data)
        .then(response => response.data);
};

export const editPostComment = data => {
    return axios.put('/posts/comments', data)
        .then(response => response.data);
};

export const deletePostComments = pid => {
    return axios.delete('/posts/comments', { data: { postId: pid }})
        .then(response => response.data);
};

export const deletePostComment = cid => {
    return axios.delete('/posts/comment', { data: { cid: cid } })
        .then(response => response.data);
};

export const addPostLike = data => {
    return axios.put("/posts/likes", data)
        .then(response => response.data);
};

export const deletePost = pid => {
    return axios.delete('/posts', { data: { postId: pid }})
        .then(response => response.data);
};
