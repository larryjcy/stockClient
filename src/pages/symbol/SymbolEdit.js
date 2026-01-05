import React, {useCallback, useEffect, useState} from 'react'
import { useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// third party
import { Formik } from 'formik'
import { useFormikContext } from 'formik'

// material-ui
import {
    Button, Checkbox, FormControlLabel,
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
import SymbolEventApi from "../../api/SymbolEventApi";
import SearchOptionsHelp from "../../lib/SearchOptionsHelp"
import SymbolHelp from "../../lib/SymbolHelp";

function SectorEditWatcher({ setAvailableTags }) {
    const { values, setFieldValue } = useFormikContext()

    useEffect(() => {
        const tags = SymbolHelp.sectorTagMap(values.sector) || []
        setAvailableTags(tags)
        setFieldValue('tags', [])
    }, [values.sector])

    return null
}

const SymbolEdit = () => {
    const { ticker } = useParams()
    const navigate = useNavigate()

    const [symbol, setSymbol] = useState(null)
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags]  = useState([])
    const sectorOptions = SymbolHelp.getSectors()
    const statusOptions = SearchOptionsHelp.statusOptions()
    const [availableTags, setAvailableTags] = useState([])

    const getInit = useCallback(async () => {
        try {
            let data = await SymbolApi.detail(ticker)
            if (data) {
                setSymbol(data)
                if (data?.sector) {
                    setTags(SymbolHelp.sectorTagMap(data?.sector))
                }
                if (data?.SymbolTags) {
                    const tempTags = data?.SymbolTags.map(item => item.tagName)
                    setSelectedTags(tempTags);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }, [ticker])

    useEffect(() => {
        getInit()
    }, [getInit])

    const handleTagChange = (tag, checked) => {
        setSelectedTags(prev => {
            const nextTags = checked
                ? prev.includes(tag) ? prev : [...prev, tag]
                : prev.filter(s => s !== tag)

            return nextTags
        })
    }

    return (
        <>
            <Breadcrumbs custom heading='股票代码编辑' />
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
                        content: symbol?.Company?.content,
                        submit: null
                    }}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        const data = {
                            ...values
                        }
                        data.tags = selectedTags;
                        data.company = {
                            content: values.content,
                        }
                        let response = await SymbolApi.update(symbol.id, data)

                        if (response && response.status == 200) {
                            enqueueSnackbar('更新成功!', {
                                variant: 'success',
                                autoHideDuration: 3000,
                                anchorOrigin: {horizontal: 'right', vertical: 'top'}
                            })
                            // setTimeout(() => {
                            //     navigate('/symbol')
                            // }, 2000)
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
                                        <InputLabel htmlFor="ticker-edit">代码</InputLabel>
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
                                        <InputLabel htmlFor="name-edit">名称</InputLabel>
                                        <OutlinedInput
                                            id="name-edit"
                                            type="text"
                                            value={values.name}
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="输入股票名称"
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
                                        <InputLabel htmlFor="exchange-edit">交易所</InputLabel>
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
                                        <InputLabel htmlFor="sector-edit">分类</InputLabel>
                                        <Select id="sector"
                                                name="sector"
                                                fullWidth
                                                value={values.sector}
                                                onChange={handleChange}
                                        >
                                            {sectorOptions.map((option, index) =>
                                                <MenuItem key={'sector-' + index} value={option}>{option}</MenuItem>
                                            )}
                                        </Select>
                                        {touched.sector && errors.sector && (
                                            <FormHelperText error id="standard-weight-helper-text-sector-edit">
                                                {errors.sector}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <SectorEditWatcher setAvailableTags={setAvailableTags} />
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="industry-edit">行业</InputLabel>
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
                                        <InputLabel htmlFor="marketCap-edit">市值</InputLabel>
                                        <OutlinedInput
                                            id="marketCap-edit"
                                            type="text"
                                            value={values.marketCap}
                                            name="marketCap"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter 市值"
                                            fullWidth
                                            autoComplete="off"
                                            error={Boolean(touched.marketCap && errors.marketCap)}
                                        />
                                        {touched.marketCap && errors.marketCap && (
                                            <FormHelperText error id="standard-weight-helper-text-marketCap-edit">
                                                {errors.marketCap}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel id="status-label">系统追踪</InputLabel>
                                        <Select id="status"
                                                name="status"
                                                value={statusOptions.length > 0 ? values.status : ''}
                                                onChange={handleChange}
                                        >
                                            {statusOptions.map((statusOption) =>
                                                <MenuItem key={'statusOption' + statusOption.value} value={statusOption.value}>{statusOption.label}</MenuItem>
                                            )}
                                        </Select>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="content">公司简介</InputLabel>
                                        <OutlinedInput
                                            id="content"
                                            type="text"
                                            value={values.content}
                                            name="content"
                                            onChange={handleChange}
                                            placeholder="公司简介"
                                            multiline={true}
                                            rows={4}
                                            fullWidth
                                            error={Boolean(touched.content && errors.content)}
                                        />
                                        {touched.content && errors.content && (
                                            <FormHelperText error id="standard-weight-helper-text-content">
                                                {errors.content}
                                            </FormHelperText>
                                        ) }
                                    </Stack>
                                </Grid>
                                {availableTags.length > 0 && (
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={1} alignItems="right" justifyContent="space-between" sx={{ padding: 1 }}>
                                        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                                            <InputLabel id="status-label">标签</InputLabel>
                                            {availableTags?.map(tag => (
                                                <FormControlLabel
                                                    key={tag} // ✅ REQUIRED
                                                    control={
                                                        <Checkbox
                                                            checked={selectedTags.includes(tag)}
                                                            onChange={(e) => handleTagChange(tag, e.target.checked)}
                                                        />
                                                    }
                                                    label={tag}
                                                    labelPlacement="end"
                                                />
                                            ))}
                                        </Stack>
                                    </Stack>
                                </Grid>
                                )}
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
                                                保存
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
            <SnackbarProvider />
        </>
    )
}

export default SymbolEdit
