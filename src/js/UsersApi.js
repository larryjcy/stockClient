import axiosHttp from './axiosHttp'
import util from "../utils/util"
export default {
    async create(user){
        if (user.dob) {
            user.dob = util.getDayValue(user.dob)
        } else {
            user.dob = null
        }
        try {
            const url = '/users'
            return await axiosHttp.post(url, user)
        } catch (error) {
            return error.response.data
        }
    },

    async update(id, user) {
        if (user.dob) {
            user.dob = util.getDayValue(user.dob)
        } else {
            user.dob = null
        }

        try {
            const url = '/users/' + id
            const result = await axiosHttp.put(url, user)
            return result
        } catch (error) {
            console.log(error)
            return error.response.data
        }
    },

    async detail(id){
        try {
            const url = '/users/' + id
            const result = await axiosHttp.get(url)
            return result.data
        } catch (error) {
            console.log(error.response.data)
        }
    },

    async search(filter, sortingOption, offset, limit){
        let filterStr = '{}'
        let sortingstr = '{}'
        if (filter) {
            if (filter['typeId'] && typeof filter['typeId'] !== 'number') {
                filter['typeId'] = 0
            }
            filterStr = JSON.stringify(filter)
        }
        if (sortingOption) {
            sortingstr = JSON.stringify(sortingOption)
        }
        try {
            const url = '/users/search'
            const params = {
                filter: filterStr,
                sorting: sortingstr,
                offset: offset,
                limit: limit
            }
            const result = await axiosHttp.post(url, params)
            return result.data
        } catch (error) {
            console.log(error)
        }
    },

    async findTotal(filter){
        let filterStr = '{}'
        if (filter) {
            if (filter['typeId'] && typeof filter['typeId'] !== 'number') {
                filter['typeId'] = 0
            }
            filterStr = JSON.stringify(filter)
        }
        try {
            const url = '/users/findTotal'
            const params = {
                filter: filterStr
            }
            const result = await axiosHttp.post(url, params)
            if (result && result.data) {
                return parseInt(result.data['total'])
            }
        } catch (error) {
            console.log(error)
        }
    }
}
