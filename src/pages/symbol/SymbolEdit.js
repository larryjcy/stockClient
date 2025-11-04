import React, {useCallback, useEffect, useState} from 'react'
import { useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// third party
import { Formik } from 'formik'
// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel, MenuItem,
    OutlinedInput, Select,
    Stack
} from '@mui/material'

import { SnackbarProvider, enqueueSnackbar } from 'notistack'
// assets
import MainCard from 'components/MainCard'
import Breadcrumbs from 'components/@extended/Breadcrumbs'


import ColorDialog from "../../components/ColorDialog"

import {displayMultiError} from "../../lib/help"
import {useUserContext} from "../../context/UserContext"
import SymbolApi from "../../api/SymbolApi"
import SymbolHelp from "../../lib/SymbolHelp"

const SymbolEdit = () => {
    const { id } = useParams()
    const { getSessionUser } = useUserContext()
    const sessionUser = getSessionUser()
    const navigate = useNavigate()

    const [symbol, setSymbol] = useState(null)
    const statusOptions = SymbolHelp.statuses()

    const getInit = useCallback(async () => {
        try {
            let data = await SymbolApi.detail(id)
            if (data) {
                setSymbol(data)
            }
        } catch (error) {
            console.log(error)
        }
    }, [id, sessionUser])

    useEffect(() => {
        getInit()
    }, [getInit])

    return (
        <>
            <Breadcrumbs custom heading='Staff Edit' />
            <MainCard border={false} boxShadow>
            {(symbol) &&
                <Formik
                    initialValues={{
                        ticker: symbol.ticker,
                        name: symbol.name,
                        exchange: symbol.exchange,
                        sector: symbol.sector,
                        industry: symbol.industry,
                        market_cap: symbol.market_cap,
                        watch: symbol.watch,
                        priority: symbol.priority,
                        status: symbol.status,
                        volume: symbol.volume,
                        submit: null
                    }}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        const data = {
                            ...values
                        }
                        if (typeId) {
                            data.typeId = typeId
                        }
                        data.username = values.nickname
                        data.password = values.pwd
                        data.color = userColor

                        let response = await UsersApi.update(id, data)
                        if (response && response.status == 200) {
                            enqueueSnackbar('User update success!', {
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
                                        <InputLabel htmlFor="ticker-edit">Ticker</InputLabel>
                                        <OutlinedInput
                                            id="ticker-edit"
                                            type="text"
                                            value={values.ticker}
                                            name="ticker"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter ticker"
                                            fullWidth
                                            error={Boolean(touched.ticker && errors.ticker)}
                                        />
                                        {touched.ticker && errors.ticker && (
                                            <FormHelperText error id="standard-weight-helper-text-ticker-edit">
                                                {errors.ticker}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-edit">Name</InputLabel>
                                        <OutlinedInput
                                            id="name-edit"
                                            type="text"
                                            value={values.name}
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter Name"
                                            fullWidth
                                            error={Boolean(touched.name && errors.name)}
                                        />
                                        {touched.name && errors.name && (
                                            <FormHelperText error id="standard-weight-helper-text-name-edit">
                                                {errors.name}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="exchange-edit">Exchange</InputLabel>
                                        <OutlinedInput
                                            id="exchange-edit"
                                            type="exchange"
                                            value={values.exchange}
                                            name="exchange"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter exchange"
                                            fullWidth
                                            error={Boolean(touched.exchange && errors.exchange)}
                                        />
                                        {touched.exchange && errors.exchange && (
                                            <FormHelperText error id="standard-weight-helper-text-exchange-edit">
                                                {errors.exchange}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="sector-edit">Sector</InputLabel>
                                        <OutlinedInput
                                            id="sector-edit"
                                            type="text"
                                            value={values.sector}
                                            name="sector"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="sector"
                                            fullWidth
                                            error={Boolean(touched.sector && errors.sector)}
                                        />
                                        {touched.sector && errors.sector && (
                                            <FormHelperText error id="standard-weight-helper-text-sector-edit">
                                                {errors.sector}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="industry-edit">Industry</InputLabel>
                                        <OutlinedInput
                                            id="industry-edit"
                                            type="text"
                                            value={values.industry}
                                            name="industry"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter industry"
                                            fullWidth
                                            autoComplete="off"
                                            error={Boolean(touched.pwd && errors.pwd)}
                                        />
                                        {touched.industry && errors.industry && (
                                            <FormHelperText error id="standard-weight-helper-text-industry-edit">
                                                {errors.industry}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="market_cap-edit">Market Cap</InputLabel>
                                        <OutlinedInput
                                            id="market_cap-edit"
                                            type="text"
                                            value={values.market_cap}
                                            name="market_cap"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter market cap"
                                            fullWidth
                                            autoComplete="off"
                                            error={Boolean(touched.market_cap && errors.market_cap)}
                                        />
                                        {touched.market_cap && errors.market_cap && (
                                            <FormHelperText error id="standard-weight-helper-text-market_cap-edit">
                                                {errors.market_cap}
                                            </FormHelperText>
                                        )}
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
            </MainCard>
            <ColorDialog
                openColor={openColor}
                onClose={handleCloseColor}
                colorList={colorList}
                colorCode={userColor}
                handleSelectColor={handleSelectColor}
            />
            <SnackbarProvider />
        </>
    )
}

export default SymbolEdit
