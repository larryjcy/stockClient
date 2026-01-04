import React, {useCallback, useEffect, useState} from "react"

// material-ui
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, InputLabel, MenuItem, OutlinedInput, Select, Stack
} from '@mui/material'


import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DatePicker} from "@mui/x-date-pickers/DatePicker"

import dayjs from "dayjs"
import SymbolEventApi from "../../api/SymbolEventApi"
import SymbolEventHelp from '../../lib/SymbolEventHelp'

// ==============================|| DIALOG - FORM ||============================== //

export default function AddEventDialog(props) {
console.log(props);
    const open = props.open
    const ticker = props.ticker
    const handleCloseAddEvent = props.handleCloseAddEvent
    const [note, setNote] = useState(null)
    const [eventDay, setEventDay] = useState(null)
    const [eventType, setEventType] = useState(0)
    const eventTypes = SymbolEventHelp.eventTypeOptions()
    const handleChange = (key, newData) => {
        switch (key) {
            case 'eventDay':
                setEventDay(newData)
                break
            case 'note':
                setNote(newData);
                break;
            case 'eventType':
                setEventType(Number(newData));
                break;
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        const data = {
            ticker,
            note,
            eventDay,
            eventType
        }
        await SymbolEventApi.create(data);
        handleCloseAddEvent()
    }

    return (
        <>
            {(ticker && open) &&
                <Dialog open={open}>
                    <Box sx={{ p: 1, py: 1.5 }}>
                        <DialogTitle>增加备注</DialogTitle>
                        <DialogContent>

                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={2} alignItems="center">

                                    <Grid item xs={12}>
                                        <Grid item xs={12} lg={12}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={12} lg={3}>
                                                    <InputLabel>事件日期</InputLabel>
                                                </Grid>
                                                <Grid item xs={12} lg={9}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            format="YYYY-MM-DD"
                                                            defaultValue={''}
                                                            slotProps={{
                                                                actionBar: {
                                                                    actions: ['clear']
                                                                }
                                                            }}
                                                            value={eventDay}
                                                            onChange={(date) => {
                                                                handleChange('eventDay', date)
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item xs={12} lg={12}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={12} lg={3}>
                                                    <InputLabel>影响因素</InputLabel>
                                                </Grid>
                                                <Grid item xs={12} lg={9}>
                                                    <Select id="eventType"
                                                            name="eventType"
                                                            fullWidth
                                                            value={eventType}
                                                            onChange={(event) => {
                                                                handleChange('eventType', event.target.value)
                                                            }}
                                                    >
                                                        {eventTypes.map((option, index) =>
                                                            <MenuItem key={'eventType-' + index} value={option.id}>{option.name}</MenuItem>
                                                        )}
                                                    </Select>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item xs={12} lg={12}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={12} lg={3}>
                                                    <InputLabel>内容</InputLabel>
                                                </Grid>
                                                <Grid item xs={12} lg={9}>
                                                    <OutlinedInput
                                                        id="note-edit"
                                                        type="text"
                                                        value={note}
                                                        name="note"
                                                        inputProps={{ 'data-testid': 'note' }}
                                                        multiline={true}
                                                        rows={4}
                                                        placeholder="Enter Note"
                                                        fullWidth
                                                        onChange={(event) => {
                                                            handleChange('note', event.target.value)
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item xs={12}>
                                            <Stack direction="row" spacing={4} justifyContent="left" alignItems="center">
                                                <DialogActions>
                                                    <Button variant="contained" type="submit" size="medium" sx={{ textTransform: 'none' }} date-testid="submit">
                                                        保存
                                                    </Button>
                                                    <Button color="error" onClick={props.handleCloseAddEvent} data-testid="cancel">
                                                        取消
                                                    </Button>
                                                </DialogActions>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContent>

                    </Box>
                </Dialog>
            }
        </>
    )
}
