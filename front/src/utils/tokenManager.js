let TOKEN

export const getToken = () => {
    return TOKEN
}

export const setToken = (token) => {
    TOKEN = token ? `bearer ${token}` : null
}

export const getAuthHeader = () => {
    return {
        headers: { Authorization: TOKEN }
    }
}

export default {
    getAuthHeader,
    setToken,
    getToken
}