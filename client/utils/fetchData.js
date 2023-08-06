import axios from "axios" 

export const postAuthDataApi = async (url, token) => {
    const res = await axios.post(`/api/auth/${url}`, {
        headers: {
            Authorization: token,
        }
    })
    return res
}

export const getUserDataApi = async (url, token) => {
    const res = await axios.get(`/api/user/${url}`, {
        headers: {
            Authorization: token,
        }
    })
    return res
}

export const postUserDataApi = async (url, token) => {
    const res = await axios.post(`/api/user/${url}`, {
        headers: {
            Authorization: token,
        }
    })
    return res
}

export const patchUserDataApi = async (url, token) => {
    const res = await axios.patch(`/api/user/${url}`, {
        headers: {
            Authorization: token,
        }
    })
    return res
}

export const getPostDataApi = async (url, token) => {
    const res = await axios.get(`/api/post/${url}`, {
        headers: {
            Authorization: token,
        }
    })
    return res
}

export const postPostDataApi = async (url, token) => {
    const res = await axios.post(`/api/post/${url}`, {
        headers: {
            Authorization: token,
        }
    })
    return res
}

export const patchPostDataApi = async (url, token) => {
    const res = await axios.patch(`/api/post/${url}`, {
        headers: {
            Authorization: token,
        }
    })
    return res
}

export const deletePostDataApi = async (url, token) => {
    const res = await axios.delete(`/api/post/${url}`, {
        headers: {
            Authorization: token,
        }
    })
    return res
}

export const postCommentDataApi = async (url, token) => {
    const res = await axios.post(`/api/comment/${url}`, {
        headers: {
            Authorization: token,
        }
    })
    return res
}

export const patchCommentDataApi = async (url, token) => {
    const res = await axios.patch(`/api/comment/${url}`, {
        headers: {
            Authorization: token,
        }
    })
    return res
}


