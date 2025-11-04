import dayjs from "dayjs"

export default {
    getDefaultHistorySearchOptions() {
        return {
            clientKeyword: '',
            aptId: '',
            clientUid: '',
            familyId: '',
            startDate: dayjs(),
            endDate: dayjs()
        }
    },
    getDefaultClientSearchOptions() {
        return {
            clientKeyword: '',
            aptId: '',
            clientUid: '',
            startDate: dayjs(),
            endDate: dayjs()
        }
    },
    getDefaultStaffSearchOptions() {
        return {
            userId: 0,
            startDate: dayjs(),
            endDate: dayjs()
        }
    },
    getDefaultPurchaseOrderSearchOptions() {
        return { 
            PurchaseREF: '', 
            InvoiceNo: '', 
            SupplierID: '',
            startDate: dayjs(),
            endDate: dayjs()
        }
    },
    getDefaultFamilySearchOptions() {
        return {
            clientKeyword: '',
            familyId: '',
            clientUid: '',
            startDate: dayjs(),
            endDate: dayjs()
        }
    },
    getDefaultProductSearchOptions() {
        return {
            categoryName: '',
            supplierName: '',
            sku: '',
            productName: ''
        }
    },
    getDefaultVisitSearchOptions() {
        return {
            clientKeyword: '',
            visitId: '',
            clientUid: '',
            startDate: dayjs(),
            endDate: dayjs()
        }
    }


}