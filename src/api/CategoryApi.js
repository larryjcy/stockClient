import axiosHttp from './axiosHttp'
import {STATUS_ACTIVE} from '../constants/userConstants'

export default {
    async getAllCategory(serviceId = null) {
        try {
            let url = '/category'
            if (serviceId) {
                url += '?serviceId=' + serviceId
            }
            const result = await axiosHttp.get(url)
            if (result && result.data) {
                return result.data
            }
        } catch (error) {
            return []
        }
    },
    async getActiveCategory() {
        const all = await this.getAllCategory()
        return (all || []).filter(c => Number(c?.status) === STATUS_ACTIVE)
    },
    async detail(id) {
        try {
            let url = '/category/' + id
            const result = await axiosHttp.get(url)
            if (result && result.data) {
                return result.data
            }
        } catch (error) {
            return []
        }
    },
    async create(category) {
        try {
            const url = '/category'
            const result = await axiosHttp.post(url, category)
            return result
        } catch (error) {
            console.log(error)
            return error.response.data
        }
    },
    async update(id, category) {
        try {
            const url = '/category/' + id
            const result = await axiosHttp.put(url, category)
            return result
        } catch (error) {
            console.log(error)
            return error.response.data
        }
    }
}