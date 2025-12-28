import React, {useState, useEffect} from "react"
import PropTypes from 'prop-types'
import { Stack, Tooltip, IconButton} from '@mui/material'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import {DatePicker} from "@mui/x-date-pickers/DatePicker"

import {DebouncedInput} from "../components/third-party/react-table"
import { useSearchFilterContext } from "../context/SearchFilterContext"
import dayjs from "dayjs"

const SearchVisitFilterBar = (props) => {
    const { getContextFilterOption, setContextFilterOption } = useSearchFilterContext()
    const [filters, setFilters] = useState(null)

    useEffect(() => {
        const historySearchData = getContextFilterOption(props.searchCacheKey)
        const temp = historySearchData ? { ...historySearchData } : null
        if (temp) {
            // FIX: Keep dates as null if they're null - don't default to today
            if (temp.startDate) {
                if (typeof temp.startDate === 'string') {
                    temp.startDate = dayjs(temp.startDate)
                }
            } else {
                temp.startDate = null  // ✅ Keep as null, not dayjs()
            }
            if (temp.endDate) {
                if (typeof temp.endDate === 'string') {
                    temp.endDate = dayjs(temp.endDate)
                }
            } else {
                temp.endDate = null  // ✅ Keep as null, not dayjs()
            }
            setFilters(temp)
        } else {
            setFilters(props.initFilter)
            setContextFilterOption(props.searchCacheKey, props.initFilter)
        }

    }, [props.searchCacheKey, getContextFilterOption, setContextFilterOption, props.initFilter])

    const handleFieldChange = (field, value) => {
        setFilters((preState) =>{
            return { ...preState,
                [field]: value
            }
        })
        let searchOptions = { ...filters }
        searchOptions[field] = value
        setContextFilterOption(props.searchCacheKey, searchOptions)
    }

    const handleCleanSearch = () => {
        setContextFilterOption(props.searchCacheKey, props.initFilter)
        setFilters(props.initFilter)
    }

    return (
        <>
            {(filters) &&
                <Stack direction="row" spacing={2} alignItems="right" justifyContent="space-between" sx={{padding: 2}}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <DebouncedInput
                            variant="outlined"
                            size="small"
                            label="Client ID"
                            name='clientUid'
                            value={filters?.clientUid ?? ''}
                            onFilterChange={(value) => handleFieldChange('clientUid', value)}
                            placeholder={`Client ID`}
                        />
                        <DebouncedInput
                            variant="outlined"
                            size="small"
                            label="Name"
                            name='clientKeyword'
                            value={filters?.clientKeyword ?? ''}
                            onFilterChange={(value) => handleFieldChange('clientKeyword', value)}
                            placeholder={`Name`}
                        />
                        <DebouncedInput
                            variant="outlined"
                            size="small"
                            label="Visit ID"
                            name='visitId'
                            value={filters?.visitId ?? ''}
                            onFilterChange={(value) => handleFieldChange('visitId', value)}
                            placeholder={`Visit ID`}
                        />
                        {/* <DebouncedInput
                            variant="outlined"
                            size="small"
                            label="Appt ID"
                            name='aptId'
                            value={filters?.aptId ?? ''}
                            onFilterChange={(value) => handleFieldChange('aptId', value)}
                            placeholder={`Appt ID`}
                        /> */}
                        <DatePicker
                            label="Start Date"
                            format="YYYY-MM-DD"
                            name='startDate'
                            value={filters?.startDate ?? null}
                            slotProps={{
                                actionBar: {
                                    actions: ['clear']
                                },
                                textField: {
                                    placeholder: 'YYYY-MM-DD'  // Show format hint when empty
                                }
                            }}
                            onChange={(newValue) => {
                                handleFieldChange('startDate', newValue)
                            }}
                        />
                        <DatePicker
                            label="End Date"
                            format="YYYY-MM-DD"
                            name='endDate'
                            value={filters?.endDate ?? null} 
                            slotProps={{
                                actionBar: {
                                    actions: ['clear']
                                },
                                textField: {
                                    placeholder: 'YYYY-MM-DD'  // Show format hint when empty
                                }
                            }}
                            onChange={(newValue) => {
                                handleFieldChange('endDate', newValue)
                            }}
                        />
                        <Tooltip title="Clean search">
                            <IconButton sx={{alignSelf: 'center'}} onClick={handleCleanSearch}>
                                <ClearAllIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            }
        </>
    )
}


export default SearchVisitFilterBar

SearchVisitFilterBar.propTypes = {
    initFilter:PropTypes.object,
    searchCacheKey: PropTypes.string,
    allowEditStaffKeyword: PropTypes.bool
}