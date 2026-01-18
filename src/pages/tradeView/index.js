import React, {useCallback, useEffect, useState} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
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

import {displayMultiError} from "../../lib/help"
import SymbolApi from "../../api/SymbolApi"
import SearchOptionsHelp from "../../lib/SearchOptionsHelp"
import TradingViewChart from  './TradingViewChart'
const SymbolEdit = () => {
    const { ticker } = useParams()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();    // query params
    const exchange = searchParams.get('exchange'); // string | null
    // const [symbol, setSymbol] = useState(null)

    // const getInit = useCallback(async () => {
    //     try {
    //         let data = await SymbolApi.detail(id)
    //         if (data) {
    //             setSymbol(data)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [id])

    // useEffect(() => {
    //     getInit()
    // }, [getInit])

    return (
        <>
            <Breadcrumbs custom heading='Trade View' />
            <MainCard border={false} boxShadow>
                {(ticker) &&
                    <TradingViewChart
                        ticker={ticker}
                        exchange={exchange}
                    />
                }
            </MainCard>
            <SnackbarProvider />
        </>
    )
}

export default SymbolEdit
