import axiosHttp from './axiosHttp'

export default {
    async create(symbol) {

        try {
            const url = '/symbolEvent'
            return await axiosHttp.post(url, symbol)
        } catch (error) {
            return error.response.data
        }
    },

    async update(id, symbol) {
        try {
            const url = '/symbolEvent/' + id
            const result = await axiosHttp.put(url, symbol)
            return result
        } catch (error) {
            console.log(error)
            return error.response.data
        }
    },

    async detail(ticker){
        try {
            const url = '/symbolEvent/ticker/' + ticker
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
            const url = '/symbolEvent/search'
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
