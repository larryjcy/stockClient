import {
    STATUS_ACTIVE,
    STATUS_DISABLE
} from "../constants/userConstants"
export default {
    statuses() {
        return [
            {
                id: 1,
                name: 'Active'
            },
            {
                id: 2,
                name: 'Disable'
            }
        ]
    },
    getAllStatusList() {
        return [
            {
                label: 'Active',
                value: STATUS_ACTIVE
            },

            {
                label: 'Disable',
                value: STATUS_DISABLE
            },
            {
                label: 'All',
                value: 0
            }
        ]
    }
}