import * as moment from "moment-timezone"

export default {
    getDateTimeStampMinuteValue: function (dt, format = 'YYYY-MM-DD HH:mm:00') {
        if (dt !== null) {
            if (typeof dt === 'object') {
                dt = dt.toString()
            }
            return moment(dt).tz('America/Toronto').format(format)
        }
    },
    getDateTimeStampValue: function (dt, format = 'YYYY-MM-DD HH:mm:ss') {
        if (dt !== null) {
            if (typeof dt === 'object') {
                dt = dt.toString()
            }
            return moment(dt).tz('America/Toronto').format(format)
        }
    },
    getDayEnglishFormat: function (dt) {
        if (typeof dt === 'object') {
            dt = dt.toString()
        }
        return moment(dt).tz('America/Toronto').format('MMMM Do, YYYY')
    },
    getDayValue: function (dt) {
        if (dt) {
            if (typeof dt === 'object') {
                dt = dt.toString()
            }
            return moment(dt).tz('America/Toronto').format('YYYY-MM-DD')
        }
    },
    getDayOfWeek: function (dt) {
        if (dt) {
            if (typeof dt === 'object') {
                dt = dt.toString()
            }
            return moment(dt).tz('America/Toronto').format('dddd')
        }
    },
    getToday: function () {
        return moment().tz('America/Toronto').format('YYYY-MM-DD')
    },
    getMonthFistDay: function (day) {
        const firstDay = moment(day).tz('America/Toronto').startOf('month')
        return firstDay.tz('America/Toronto').format('YYYY-MM-DD')
    },
    getMonthLastDay: function (day) {
        const lastDay = moment(day).tz('America/Toronto').endOf('month')
        return lastDay.tz('America/Toronto').format('YYYY-MM-DD')
    },
    getDayObject: function (dt) {
        if (dt) {
            if (typeof dt === 'object') {
                dt = dt.toString()
            }
            return moment(dt).tz('America/Toronto')
        }
    },
    getDiffMinute(startTime, endTime) {
        const startMoment = moment(startTime).tz('America/Toronto')
        const endMoment = moment(endTime).tz('America/Toronto')
        return  endMoment.diff(startMoment, 'minutes')
    },
    convertMinutesToHours(minutes) {
        if (typeof minutes === 'number') {
            const hours = minutes / 60
            // Round the result to one decimal place
            const roundedHours = Math.round(hours * 100) / 100
            return roundedHours
        } else {
            return 0
        }
    },
    getLaterTimeByFormat(timeFormat, totalTime) {
        return  moment().add(totalTime, timeFormat).toDate()
    },
    showAMPMHour(hour) {
        const monthDayPattern = /([0-9][0-9])-([0-9][0-9])/
        if(monthDayPattern.test(hour)) {
            hour = hour.match(/\d{2}:\d{2}:\d{2}/)[0]
        }
        let formattedTime = ''
        if (hour) {
            const time = moment(hour, 'HH:mm').tz('America/Toronto')
            formattedTime = time.tz('America/Toronto').format('hh:mm A')
        }
        return formattedTime
    },
    getEnglishAMPMHour(date) {
        return moment(date).tz('America/Toronto').format('hh:mm A')
    },
    monthDays(month) {
        let startOfMonth = null
        let endOfMonth = null
        if (month === 0) {
            startOfMonth = moment().tz('America/Toronto').startOf('month')
            endOfMonth = moment().tz('America/Toronto').endOf('month')
        } else if (month < 0) {
            month = Math.abs(month)
            startOfMonth = moment().subtract(month, 'months').tz('America/Toronto').startOf('month')
            endOfMonth = moment().subtract(month, 'months').tz('America/Toronto').endOf('month')
        } else if (month > 0) {
            startOfMonth = moment().add(month, 'months').tz('America/Toronto').startOf('month')
            endOfMonth = moment().add(month, 'months').tz('America/Toronto').endOf('month')
        }
        const daysInMonth = []

        for (let day = startOfMonth; day.isBefore(endOfMonth) || day.isSame(endOfMonth); day.add(1, 'day')) {
            daysInMonth.push(day.format('YYYY-MM-DD'))
        }
        return daysInMonth
    },
    validateFilterOptionsDay(filterOptions) {
        let validate = true
        if (filterOptions?.startDate) {
            if (typeof filterOptions?.startDate === 'object') {
                return filterOptions.startDate.isValid()
            }
            validate = this.isValidateDay(filterOptions?.startDate)
            if (!validate) {
                return false
            }
        }
        if (filterOptions?.endDate) {
            if (typeof filterOptions?.endDate === 'object') {
                return filterOptions.endDate.isValid()
            }
            validate = this.isValidateDay(filterOptions?.endDate)
            if (!validate) {
                return false
            }
        }
        return validate
    },
    isValidateDay(day) {
        const regex = /^\d{4}-\d{2}-\d{2}$/
        if (regex.test(day)) {
            return true
        }
        return false
    },
    getMonthStr(date) {
        return moment(date).format('MMMM, YYYY')
    },
    toCurrencyAmount: function(amount) {
        return Math.round(amount * 100) / 100
    },
    currencyFormat: function(amount) {
        if (amount !== null && amount !== undefined) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
            return formatter.format(amount)
        }
    },
    displayHours(hours) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
    },
    isJSON: function(value) {
        if (typeof value !== "string") {
            return false
        }
        try {
            JSON.parse(value)
            return true
        } catch (e) {
            return false
        }
    },
    getOfficeStartTime() {
        const openHour = new Date()
        openHour.setHours(9)
        openHour.setMinutes(0)
        openHour.setSeconds(0)
        return openHour
    },
    getOfficeCloseTime() {
        const closeHour = new Date()
        closeHour.setHours(22)
        closeHour.setMinutes(0)
        closeHour.setSeconds(0)
        return closeHour
    },

    getMonthDays(date) {
        const specificDate = moment(date)

        // Get the start and end of the month (clone to avoid modifying the original object)
        const startOfMonth = specificDate.clone().startOf('month')
        const endOfMonth = specificDate.clone().endOf('month')

        const daysInMonth = []

        // Loop through the days from start to end of the month
        let currentDay = startOfMonth.clone() // Use clone() to avoid mutation
        while (currentDay.isSameOrBefore(endOfMonth)) {
            daysInMonth.push(currentDay.format('YYYY-MM-DD')) // Format the date
            currentDay.add(1, 'day') // Move to the next day
        }

        return daysInMonth
    },
    filterStartEndDateFormat(filter) {
        const filterOption = _.cloneDeep(filter)
        if (filterOption?.startDate && typeof filterOption.startDate === 'object') {
            filterOption.startDate = filterOption.startDate.format("YYYY-MM-DD")
        }
        if (filterOption?.endDate && typeof filterOption.endDate === 'object') {
            filterOption.endDate = filterOption.endDate.format("YYYY-MM-DD")
        }
        return filterOption
    }
}