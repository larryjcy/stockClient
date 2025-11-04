import dayjs from "dayjs"

export default {
    getFilterOptions(searchCacheKey) {
        const storeValue = localStorage.getItem(searchCacheKey)
        let startDate = dayjs()
        let endDate = dayjs()
        let clientId = null
        let client = null
        let aptId = null
        let familyId = null
        let clientKeyword = ''
        let clientUid = null
        let staffKeyword = ''
        let disabled = null
        let userId = null
        if (storeValue) {
            try {
                const obj = JSON.parse(storeValue)
                if (Object.prototype.hasOwnProperty.call(obj, 'startDate')) {
                    startDate = dayjs(obj.startDate, 'YYYY-MM_DD')
                
                }
                if (Object.prototype.hasOwnProperty.call(obj, 'endDate')) {
                    endDate = dayjs(obj.endDate, 'YYYY-MM_DD')
                }
                if (Object.prototype.hasOwnProperty.call(obj, 'clientId')) {
                    clientId = obj.clientId
                }
                if (Object.prototype.hasOwnProperty.call(obj, 'aptId')) {
                    aptId = obj.aptId
                }
                if (Object.prototype.hasOwnProperty.call(obj, 'familyId')) {
                    familyId = obj.familyId
                }
                if (Object.prototype.hasOwnProperty.call(obj, 'clientKeyword')) {
                    clientKeyword = obj.clientKeyword
                }
                if (Object.prototype.hasOwnProperty.call(obj, 'clientUid')) {
                    clientUid = obj.clientUid
                }
                if (Object.prototype.hasOwnProperty.call(obj, 'staffKeyword')) {
                    staffKeyword = obj.staffKeyword
                }
                if (Object.prototype.hasOwnProperty.call(obj, 'disabled')) {
                    disabled = obj.disabled
                }
                if (Object.prototype.hasOwnProperty.call(obj, 'userId')) {
                    userId = obj.userId
                }
            } catch (e) {
                console.log(e)
            }
        }

        return {
            startDate: startDate,
            endDate: endDate,
            clientId: clientId,
            client: client,
            aptId: aptId,
            familyId: familyId,
            clientKeyword: clientKeyword,
            clientUid: clientUid,
            staffKeyword: staffKeyword,
            disabled: disabled,
            userId: userId
        }
    },

    saveCache(searchCacheKey, obj) {
        localStorage.setItem(searchCacheKey,JSON.stringify(obj))
    }
}