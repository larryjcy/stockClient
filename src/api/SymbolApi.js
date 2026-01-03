import axiosHttp from './axiosHttp'
import util from "../utils/util"
import SymbolHelp from "../lib/SymbolHelp";
export default {
    async create(symbol) {

        try {
            const url = '/symbol'
            return await axiosHttp.post(url, symbol)
        } catch (error) {
            return error.response.data
        }
    },

    async update(id, symbol) {
        try {
            const url = '/symbol/' + id
            const result = await axiosHttp.put(url, symbol)
            return result
        } catch (error) {
            console.log(error)
            return error.response.data
        }
    },

    async detail(ticker){
        try {
            const url = '/symbol/ticker/' + ticker
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
            if (filter?.tags) {
                const tags = SymbolHelp.normalizeTagsBySectors(filter?.sectors, filter?.tags);
                filter.tags = tags
                console.log(tags)
            }
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
