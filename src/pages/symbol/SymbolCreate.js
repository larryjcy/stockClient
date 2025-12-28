import React, {useCallback, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
// third party
import { Formik } from 'formik'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack
} from '@mui/material'

// assets
import SymbolApi from "../../api/SymbolApi"
import {displayMultiError} from "../../lib/help"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DatePicker} from "@mui/x-date-pickers/DatePicker"

import SymbolHelp from "../../lib/SymbolHelp"

import Breadcrumbs from "../../components/@extended/Breadcrumbs"

import {STATUS_ACTIVE} from "../../constants/userConstants"

const SymbolCreate = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [statusOptions, setStatusOptions] = useState([])

    const getInitData = useCallback(async () => {
        setStatusOptions(SymbolHelp.statuses())
        setLoading(true)
    })

    useEffect(() => {
        getInitData()
    }, [loading])


    return (
        <>
            <Breadcrumbs custom heading='Create New Symbol' />
            {(loading) &&
            <Formik
                initialValues={{
                    ticker: null,
                    name: null,
                    exchange:null,
                    sector: null,
                    industry: null,
                    market_cap: null,
                    watch: null,
                    status: STATUS_ACTIVE,
                    submit: null
                }}
                // validationSchema={Yup.object().shape({
                //     email: Yup.string().email('Must be a valid email').max(255).required('Email is required').nullable()
                //     // password: Yup.string().max(255).required('Password is required')
                // })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    const data = {
                        ...values
                    }
                    let response = await SymbolApi.create(data)
                    if (response && response.status === 200) {
                        enqueueSnackbar('Symbol create success!', {
                            variant: 'success',
                            autoHideDuration: 3000,
                            anchorOrigin: {horizontal: 'right', vertical: 'top'}
                        })
                        setTimeout(() => {
                            navigate('/users')
                        }, 2000)
                    } else {
                        response = displayMultiError(response)
                        setStatus({success: false})
                        setErrors({ submit: response.message })
                        setSubmitting(false)
                    }
                }}
            >
                {({
                      errors,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      touched,
                      values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="nickname-edit">Nick Name</InputLabel>
                                    <OutlinedInput
                                        id="nickname-edit"
                                        type="text"
                                        value={values.nickname}
                                        name="nickname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Nick Name"
                                        fullWidth
                                        error={Boolean(touched.nickname && errors.nickname)}
                                    />
                                    {touched.nickname && errors.nickname && (
                                        <FormHelperText error id="standard-weight-helper-text-nickname-edit">
                                            {errors.nickname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstName-edit">First Name</InputLabel>
                                    <OutlinedInput
                                        id="firstName-edit"
                                        type="text"
                                        value={values.firstName}
                                        name="firstName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter First Name"
                                        fullWidth
                                        error={Boolean(touched.firstName && errors.firstName)}
                                    />
                                    {touched.firstName && errors.firstName && (
                                        <FormHelperText error id="standard-weight-helper-text-firstName-edit">
                                            {errors.firstName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="lastName-edit">Last Name</InputLabel>
                                    <OutlinedInput
                                        id="lastName-edit"
                                        type="text"
                                        value={values.lastName}
                                        name="lastName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Last Name"
                                        fullWidth
                                        error={Boolean(touched.lastName && errors.lastName)}
                                    />
                                    {touched.lastName && errors.lastName && (
                                        <FormHelperText error id="standard-weight-helper-text-lastName-edit">
                                            {errors.lastName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="dob-edit">D.O.B.</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            format="YYYY-MM-DD"
                                            defaultValue={values.dob}
                                            slotProps={{
                                                actionBar: {
                                                    actions: ['clear']
                                                }
                                            }}
                                            onChange={(newValue) => values.dob = (newValue)}
                                        />
                                    </LocalizationProvider>
                                    {touched.dob && errors.dob && (
                                        <FormHelperText error id="standard-weight-helper-text-dob-edit">
                                            {errors.dob}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-edit">Email Address</InputLabel>
                                    <OutlinedInput
                                        id="email-edit"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-edit">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="phone-edit">Mobile Phone</InputLabel>
                                    <OutlinedInput
                                        id="phone-edit"
                                        type="text"
                                        value={values.phone}
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="phone"
                                        fullWidth
                                        error={Boolean(touched.phone && errors.phone)}
                                    />
                                    {touched.phone && errors.phone && (
                                        <FormHelperText error id="standard-weight-helper-text-phone-edit">
                                            {errors.phone}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="pwd-edit">Password</InputLabel>
                                    <OutlinedInput
                                        id="pwd-edit"
                                        type="text"
                                        value={values.pwd}
                                        name="pwd"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter New Password"
                                        fullWidth
                                        autoComplete="off"
                                        error={Boolean(touched.pwd && errors.pwd)}
                                    />
                                    {touched.pwd && errors.pwd && (
                                        <FormHelperText error id="standard-weight-helper-text-pwd-edit">
                                            {errors.pwd}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="hourlyRate-edit">Standard Hourly Rate</InputLabel>
                                    <OutlinedInput
                                        id="hourlyRate-edit"
                                        type="text"
                                        value={values.hourlyRate}
                                        name="hourlyRate"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Standard Hourly Rate"
                                        fullWidth
                                        error={Boolean(touched.hourlyRate && errors.hourlyRate)}
                                    />
                                    {touched.hourlyRate && errors.hourlyRate && (
                                        <FormHelperText error id="standard-weight-helper-text-hourlyRate-edit">
                                            {errors.hourlyRate}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="sessionRate-edit">Standard Session Rate</InputLabel>
                                    <OutlinedInput
                                        id="sessionRate-edit"
                                        type="text"
                                        value={values.sessionRate}
                                        name="sessionRate"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Standard Session Rate"
                                        fullWidth
                                        error={Boolean(touched.sessionRate && errors.sessionRate)}
                                    />
                                    {touched.sessionRate && errors.sessionRate && (
                                        <FormHelperText error id="standard-weight-helper-text-sessionRate-edit">
                                            {errors.sessionRate}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="commissionRate-edit">Standard Commission Rate</InputLabel>
                                    <OutlinedInput
                                        id="commissionRate-edit"
                                        type="text"
                                        endAdornment={<InputAdornment position="start">%</InputAdornment>}
                                        value={values.commissionRate}
                                        name="commissionRate"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Standard Commission Rate"
                                        fullWidth
                                        error={Boolean(touched.commissionRate && errors.commissionRate)}
                                    />
                                    {touched.commissionRate && errors.commissionRate && (
                                        <FormHelperText error id="standard-weight-helper-text-commissionRate-edit">
                                            {errors.commissionRate}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="commissionRate-edit">Standard Receipt Rate</InputLabel>
                                    <OutlinedInput
                                        id="receiptRate-edit"
                                        type="text"
                                        endAdornment={<InputAdornment position="start">%</InputAdornment>}
                                        value={values.receiptRate}
                                        name="receiptRate"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="% of Receipt Rate"
                                        fullWidth
                                        error={Boolean(touched.receiptRate && errors.receiptRate)}
                                    />
                                    {touched.receiptRate && errors.receiptRate && (
                                        <FormHelperText error id="standard-weight-helper-text-receiptRate-edit">
                                            {errors.receiptRate}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {/**
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="referralRate-edit">Standard Referral Rate</InputLabel>
                                    <OutlinedInput
                                        id="referralRate-edit"
                                        type="text"
                                        value={values.referralRate}
                                        name="referralRate"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Standard Referral Rate"
                                        fullWidth
                                        error={Boolean(touched.referralRate && errors.referralRate)}
                                    />
                                    {touched.referralRate && errors.referralRate && (
                                        <FormHelperText error id="standard-weight-helper-text-referralRate-edit">
                                            {errors.referralRate}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            */}
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="timesheetRate-edit">Timesheet Rate</InputLabel>
                                    <OutlinedInput
                                        id="timesheetRate-edit"
                                        type="text"
                                        value={values.timesheetRate}
                                        name="timesheetRate"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Timesheet Rate"
                                        fullWidth
                                        error={Boolean(touched.timesheetRate && errors.timesheetRate)}
                                    />
                                    {touched.timesheetRate && errors.timesheetRate && (
                                        <FormHelperText error id="standard-weight-helper-text-timesheetRate-edit">
                                            {errors.timesheetRate}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="profitShareRate-edit">Profit Share Rate</InputLabel>
                                    <OutlinedInput
                                    id="profitShareRate-edit"
                                    type="text"
                                    endAdornment={<InputAdornment position="start">%</InputAdornment>}
                                    value={values.profitShareRate}
                                    name="profitShareRate"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="e.g. 12 for 12%"
                                    fullWidth
                                    inputProps={{ inputMode: 'decimal' }}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="monthlySalary-edit">Monthly Fixed Salary</InputLabel>
                                    <OutlinedInput
                                    id="monthlySalary-edit"
                                    type="text"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    value={values.monthlySalary}
                                    name="monthlySalary"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter $ per month"
                                    fullWidth
                                    inputProps={{ inputMode: 'decimal' }}
                                    />
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="dailySalary-edit">Daily Fixed Salary</InputLabel>
                                    <OutlinedInput
                                    id="dailySalary-edit"
                                    type="text"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    value={values.dailySalary}
                                    name="dailySalary"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter $ per day"
                                    fullWidth
                                    inputProps={{ inputMode: 'decimal' }}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel id="status-label">Select Status</InputLabel>
                                    <Select id="status"
                                            name="status"
                                            value={statusOptions.length > 0 ? values.status : ''}
                                            onChange={handleChange}
                                    >
                                        {statusOptions.map((statusOption) =>
                                            <MenuItem key={'statusOption' + statusOption.id} value={statusOption.id}>{statusOption.name}</MenuItem>
                                        )}
                                    </Select>
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    {errors.submit.map((errorMsg, index) => (
                                        <FormHelperText key={"errorMsg_" + index} error>{errorMsg}</FormHelperText>
                                    ))}
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={4} justifyContent="left" alignItems="center">
                                        <Button variant="contained" type="submit" size="medium" sx={{ textTransform: 'none' }}>
                                            Save
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            }
            <SnackbarProvider />
        </>
    )
}

export default SymbolCreate
