import Axios from 'axios'

import axiosHttp from "./axiosHttp"
import ServerAPISetting from './ServerAPISetting'

export default {
    async login(formData) {
        try {
            const url = ServerAPISetting.apiUrl() + '/auth/login'
            const result = await Axios.post(url, formData)
            return result
        } catch (error) {
            return error.response
        }
    },

    async forgotPassword(formData) {
        try {
            const url = ServerAPISetting.apiUrl() + '/auth/forgotPassword'
            const result = await Axios.post(url, formData)
            return result
        } catch (error) {
            return error.response
        }
    },

    async getSessionMember() {
        try {
            const url = '/auth/profile'
            const result = await axiosHttp.get(url)
            if (result && result.data) {
                return result.data
            }
        } catch (error) {
            console.log(error)
        }
    }

}
