import axiosHttp from './axiosHttp'
import util from "../utils/util"
export default {

    async search(filter){
        let filterStr = '{}'
        if (filter) {
            filterStr = JSON.stringify(filter)
        }

        try {
            const url = '/ticker/search'
            const params = {
                filter: filterStr
                // sorting: sortingstr,
                // offset: offset,
                // limit: limit
            }
            const result = await axiosHttp.post(url, params)
            console.log(result)
            if (result && result.data) {
                return {
                    // totalCount: parseInt(result.headers['x-total-count']),
                    data: result.data
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
