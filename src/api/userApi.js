import axiosInstance from "./axiosInstance"

const login = async (email, password) => {
    try {
        const { data } = await axiosInstance.post('/users/login', { email, password })
        localStorage.setItem('token', data.data.token)
        return data
    } catch (error) {
        throw error
    }
}

const getProfile = async () => {
    try {
        const { data } = await axiosInstance.get('/users/profile')
        return data.data
    } catch (error) {
        throw error
    }
}

const putEditProfile = async (payload) => {
    try {
        const { data } = await axiosInstance.put('/users/profile', { 
            name: payload.name,
            email: payload.email,
            password: payload.password,
            photo_url: payload.photo_url
         })
        return data
    } catch (error) {
        throw error
    }
}

const signOut = async () => {
    localStorage.removeItem('token')
}

export const userApi = {
    login,
    getProfile,
    signOut,
    putEditProfile
}