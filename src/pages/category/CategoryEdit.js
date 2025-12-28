import React, {useCallback, useEffect, useState} from 'react'
import { useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// third party
import * as Yup from 'yup'
import { Formik } from 'formik'
// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack
} from '@mui/material'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

import MainCard from 'components/MainCard'
import ScrollX from 'components/ScrollX'

import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Alert from '@mui/material/Alert'

import Breadcrumbs from "../../components/@extended/Breadcrumbs"
import {displayMultiError} from "../../lib/help"
import CategoryApi from "../../api/CategoryApi"
import SymbolHelp from "../../lib/SymbolHelp"

const CategoryEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [category, setCategory] = useState()
    const [statusList, setStatusList] = useState([])
    const [statusId, setStatusId] = useState()

    const getInit = useCallback(async () => {
        try {
            setStatusList(SymbolHelp.statuses())

            const data = await CategoryApi.detail(id)
            if (data) {
                setCategory(data)
                setStatusId(data.status)
            }

        } catch (error) {
            console.log(error)
        }
    }, [id])

    useEffect(() => {
        getInit()
    }, [getInit])

    const handleStatusChange = (event) => {
        setStatusId(event.target.value)
    }


    return (
        <>
            <Breadcrumbs custom heading='Category Edit' />
            <MainCard>
                <ScrollX>
                    <Stack>
                        {(category) &&
                            <Formik
                                initialValues={{
                                    name: category.name,
                                    description: category.description,
                                    status: category.status,
                                    submit: null
                                }}
                                validationSchema={Yup.object().shape({
                                    name: Yup.string().max(255).required('Category Name is required')
                                })}
                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                    const data = {
                                        ...values
                                    }
                                    data.status = statusId
                                    let response = await CategoryApi.update(id, data)
                                    if (response && response.status === 200) {
                                        enqueueSnackbar('Category update success!', {
                                            variant: 'success',
                                            autoHideDuration: 3000,
                                            anchorOrigin: {horizontal: 'right', vertical: 'top'}
                                        })
                                        setTimeout(() => {
                                            navigate('/categories')
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
                                                    <InputLabel htmlFor="name-edit">Category Name</InputLabel>
                                                    <OutlinedInput
                                                        id="name-edit"
                                                        type="text"
                                                        value={values.name}
                                                        name="name"
                                                        inputProps={{ 'data-testid': 'name' }}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter Category Name"
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
                                                    <InputLabel htmlFor="description-edit">Description</InputLabel>
                                                    <OutlinedInput
                                                        multiline={true}
                                                        rows={4}
                                                        id="description-edit"
                                                        type="text"
                                                        value={values.description}
                                                        name="description"
                                                        inputProps={{ 'data-testid': 'description' }}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter Description"
                                                        fullWidth
                                                        error={Boolean(touched.description && errors.description)}
                                                    />
                                                    {touched.description && errors.description && (
                                                        <FormHelperText error id="standard-weight-helper-text-description-edit">
                                                            {errors.description}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="status">Category Status</InputLabel>
                                                    <Select
                                                        labelId="statusId"
                                                        id="statusId"
                                                        name="statusId"
                                                        value={statusId}
                                                        data-testid="statusId"
                                                        onChange={handleStatusChange}
                                                    >
                                                        {statusList.map((statusItem) => (
                                                            <MenuItem key={'statusItem' + statusItem.id} value={statusItem.id}>{statusItem.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </Stack>
                                            </Grid>

                                            {errors.submit && (
                                                <Grid item xs={12}>
                                                    {errors.submit.map((errorMsg, index) => (
                                                        <Alert key={'errormsg' + index} severity="error">{errorMsg}</Alert>
                                                    ))}
                                                </Grid>
                                            )}
                                            <Grid item xs={12}>
                                                <Stack direction="row" spacing={4} justifyContent="left" alignItems="center">
                                                    <Button variant="contained" type="submit" size="medium" sx={{ textTransform: 'none' }} data-testid="submit">
                                                        Save
                                                    </Button>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </form>
                                )}
                            </Formik>
                        }
                    </Stack>
                </ScrollX>
            </MainCard>
            <SnackbarProvider />
        </>
    )
}

export default CategoryEdit