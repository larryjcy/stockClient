import React from "react"

import { useNavigate } from 'react-router-dom'

// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Box, Typography } from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

import AnimateButton from 'components/@extended/AnimateButton'
import AuthApi from '../../../api/AuthApi'
import {displayMultiError} from "../../../lib/help"
import Alert from "@mui/material/Alert"

const AuthForgotPassword = () => {
    const navigate = useNavigate()

    return (
        <>
            <Formik
                initialValues={{
                  email: '',
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(50).required('Email is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    const data = {
                        email: values.email
                    }
                    let response =  await AuthApi.forgotPassword(data)
                    if (response && response.status === 200) {
                        enqueueSnackbar('Check Phone message for verification code!', {
                          variant: 'success',
                          autoHideDuration: 3000,
                          anchorOrigin: {horizontal: 'right', vertical: 'top'}
                        })
                        setTimeout(() => {
                            navigate('/checkCode/' + response.data.token)
                        }, 2000)
                    } else {
                        response = displayMultiError(response.data)
                        setStatus({success: false})
                        setErrors({ submit: response.message })
                        setSubmitting(false)
                    }

                }}
            >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="email-forgot">Email Address</InputLabel>
                          <OutlinedInput
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                            id="email-forgot"
                            type="email"
                            value={values.email}
                            name="email"
                            inputProps={{ 'data-testid': 'email' }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            />
                        </Stack>
                        {touched.email && errors.email && (
                          <FormHelperText error id="helper-text-email-forgot">
                            {errors.email}
                          </FormHelperText>
                        )}
                        </Grid>
                        {errors.submit && (
                            <Grid item xs={12}>
                                {errors.submit.map((errorMsg, index) => (
                                    <Alert key={'errormsg' + index} severity="error">{errorMsg}</Alert>
                                ))}
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Box sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                                <Typography color="secondary" sx={{ mb: 0.5, mt: 1.25 }}>
                                    We will sent a Verification Code to your phone.
                                </Typography>
                            </Box>
                        </Grid>
                        {!errors?.submit &&
                        <Grid item xs={12}>
                            <AnimateButton>
                              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                                Send Verification Code
                              </Button>
                            </AnimateButton>
                        </Grid>
                        }
                    </Grid>
                </form>
            )}
            </Formik>
            <SnackbarProvider/>
        </>
    )
}

export default AuthForgotPassword
