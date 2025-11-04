import axiosHttp from "./axiosHttp"

export default {
    async getAllSetting(filter) {
        try {
            let url = '/programConfig?access=' + filter?.access
            const result = await axiosHttp.get(url)
            if (result && result.data) {
                return result.data
            }
        } catch (error) {
            return {}
        }
    },

    async search(filter) {
        try {
            let filterStr = '{}'
            if (filter) {
                filterStr = JSON.stringify(filter)
            }
            const params = {
                filter: filterStr
            }
            let url = '/programConfig/search'
            const result = await axiosHttp.post(url, params)
            if (result && result.data) {
                return result.data
            }
        } catch (error) {
            return {}
        }
    },

    async scheduleSort(sortUserIds) {
        try {
            let dataStr = '{}'
            if (sortUserIds) {
                dataStr = JSON.stringify(sortUserIds)
            }
            const params = {
                sortUserIds: dataStr
            }
            let url = '/programConfig/scheduleSort'
            const result = await axiosHttp.post(url, params)
            if (result && result.data) {
                return result.data
            }
        } catch (error) {
            return {}
        }
    }
}