import React, {useEffect, useState} from "react"
import _ from "lodash"

// material-ui
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormControl,
    Grid
} from '@mui/material'
import util from "../utils/util"
// or

export default function MonthlyDayList(props) {
    const [monthDayList, setMonthDayList] = useState([])
    const [checkList, setCheckList] = useState([])
    useEffect(() => {
        setMonthDayList(util.monthDays(props.selectedMonth))
    }, [props.selectedMonth])

    const notifyCheckboxUpdate = (event) => {
        const temp = checkList
        if (event.target.checked) {
            temp.push(event.target.value)
        } else {
            _.pull(temp, event.target.value)
        }
        setCheckList(temp)
        props.handleSelectedDays(temp)
    }


    return (
        <Box>
            <Grid container spacing={0} alignItems="left">
            {monthDayList.map((day) => (
                <>
                    <Grid item xs={4}>
                        <FormControl>
                            <FormControlLabel label={day} labelPlacement='end' key={'monthday_' + day} control={
                                <Checkbox
                                    value={day}
                                    onChange={(event) => {
                                        notifyCheckboxUpdate(event)
                                    }}
                                />
                            }/>
                        </FormControl>
                    </Grid>
                </>
            ))}
            </Grid>
        </Box>
    )
}