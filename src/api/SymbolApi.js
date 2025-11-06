import axiosHttp from './axiosHttp'
import util from "../utils/util"
export default {
    async create(client) {
        if (client.dob) {
            client.dob = util.getDayValue(client.dob)
        } else {
            client.dob = null
        }

        try {
            const url = '/client'
            return await axiosHttp.post(url, client)
        } catch (error) {
            return error.response.data
        }
    },

    async update(id, symbol) {
        if (symbol.dob) {
            symbol.dob = util.getDateTimeStampValue(symbol.dob)
        } else {
            symbol.dob = null
        }

        try {
            const url = '/symbol/' + id
            const result = await axiosHttp.put(url, symbol)
            return result
        } catch (error) {
            console.log(error)
            return error.response.data
        }
    },

    async detail(id){
        try {
            const url = '/symbol/' + id
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
            filterStr = JSON.stringify(filter)
        }
        if (sortingOption) {
            sortingstr = JSON.stringify(sortingOption)
        }
        try {
            const url = '/symbol/search'
            const params = {
                filter: filterStr,
                sorting: sortingstr,
                offset: offset,
                limit: limit
            }
            const result = await axiosHttp.post(url, params)
            console.log(result)
            if (result && result.data) {
                return {
                    totalCount: parseInt(result.headers['x-total-count']),
                    data: result.data
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
