import axiosInstance from "./axiosInstance"

const getTasks = async () => {
    try {
        const { data } = await axiosInstance.get('/tasks')
        return data.data
    } catch (error) {
        throw error
    }
}

const addTask = async (title) => {
    try {
        const { data } = await axiosInstance.post('/tasks', { title })
        return data
    } catch (error) {
        throw error
    }
}

const doneTask = async (id) => {
    try {
        const { data } = await axiosInstance.patch('/tasks/'  + id + '/done')
        return data
    } catch (error) {
        throw error
    }
}

const deleteTask = async (id) => {
    try {
        const { data } = await axiosInstance.delete('/tasks/' + id)
        return data
    } catch (error) {
        throw error
    }
}

export const taskApi = {
    getTasks,
    addTask,
    deleteTask,
    doneTask
}