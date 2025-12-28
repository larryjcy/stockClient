import React, {useState, useEffect, useCallback} from "react"
import PropTypes from 'prop-types'
import {Stack, Tooltip, IconButton, Select, MenuItem} from '@mui/material'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import {DatePicker} from "@mui/x-date-pickers/DatePicker"

import { useSearchFilterContext } from "../context/SearchFilterContext"
import dayjs from "dayjs"
import UsersApi from "../api/UsersApi"
import _ from "lodash"
import userHelp from "../lib/SymbolHelp"
import {USER_TYPE_ADMIN, USER_TYPE_MANAGER, USER_TYPE_PRACTITIONER} from "../constants/userConstants"

const SearchStaffFilterBar = (props) => {
    const { getContextFilterOption, setContextFilterOption } = useSearchFilterContext()
    const [filters, setFilters] = useState(null)
    const [staffOptions, setStaffOptions] = useState([])

    const getInit = useCallback(async () => {
        const staffOptionList = []

        const userFilterOptions = {}
        if (props?.userTypeIds) {
            userFilterOptions.typeIds = props?.userTypeIds
        } else {
            userFilterOptions.typeIds = [USER_TYPE_PRACTITIONER, USER_TYPE_MANAGER, USER_TYPE_ADMIN]
        }
        const sortingOption = {}
        const staffResults = await UsersApi.search(userFilterOptions, sortingOption, 0, 100)

        if (staffResults) {
            _.forEach(staffResults, user => {
                user.fullName = userHelp.getFullName(user)
                const option = {
                    label: user.fullName,
                    userId: user.id.toString()
                }
                staffOptionList.push(option)
            })
        }
        setStaffOptions(staffOptionList)
    }, [])

    useEffect(() => {
        getInit()
        const historySearchData = getContextFilterOption(props.searchCacheKey)
        const temp = historySearchData ? { ...historySearchData } : null
        if (temp) {
            if ( temp.startDate) {
                if (typeof temp.startDate === 'string') {
                    temp.startDate = dayjs(temp.startDate)
                }
            } else {
                temp.startDate = dayjs()
            }
            if ( temp.endDate) {
                if (typeof temp.endDate === 'string') {
                    temp.endDate = dayjs(temp.endDate)
                }
            } else {
                temp.endDate = dayjs()
            }
            setFilters(temp)
        } else {
            setFilters(props.initFilter)
            setContextFilterOption(props.searchCacheKey, props.initFilter)
        }

    }, [props.searchCacheKey])

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
                        {(props.allowEditStaffKeyword) &&

                            <Select
                                id="userId"
                                name="userId"
                                value={filters?.userId}
                                onChange={(event) => {
                                  handleFieldChange('userId', event.target.value)
                                }}
                            >
                                <MenuItem key={'staffOptions_default'} value={0}>Select Practitioner</MenuItem>
                                {staffOptions.map((staffOption) =>
                                    <MenuItem key={'staffOptions' + staffOption.userId} value={staffOption.userId}>{staffOption.label}</MenuItem>
                                )}
                            </Select>
                        }
                        <DatePicker
                            label="Start Date"
                            format="YYYY-MM-DD"
                            name='startDate'
                            value={filters?.startDate ?? dayjs()}
                            slotProps={{
                                actionBar: {
                                    actions: ['clear']
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
                            value={filters?.endDate ?? dayjs()}
                            slotProps={{
                                actionBar: {
                                    actions: ['clear']
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


export default SearchStaffFilterBar

SearchStaffFilterBar.propTypes = {
    initFilter:PropTypes.object,
    searchCacheKey: PropTypes.string,
    allowEditStaffKeyword: PropTypes.bool
}
