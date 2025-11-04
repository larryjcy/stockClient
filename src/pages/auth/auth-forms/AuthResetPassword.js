import React from 'react'
import { useNavigate } from 'react-router-dom'

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

import AnimateButton from 'components/@extended/AnimateButton'
import AuthApi from "../../../api/AuthApi"
import {enqueueSnackbar, SnackbarProvider} from "notistack"
import {displayMultiError} from "../../../lib/help"

// assets

// ============================|| STATIC - RESET PASSWORD ||============================ //

const AuthResetPassword = (props) => {
  const navigate = useNavigate()

  return (
      <>
        <Formik
          initialValues={{
            pwd: '',
            confirmPwd: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            pwd: Yup.string().max(255).required('Password is required'),
            confirmPwd: Yup.string()
              .required('Confirm Password is required')
              .test('confirmPwd', 'Both Password must be match!', (confirmPwd, yup) => yup.parent.pwd === confirmPwd)
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            const token = props.token
            const code = props.code
            const data = {
              ...values,
              token,
              code
            }
            let response =  await AuthApi.resetPassword(data)
            if (response && response.status === 200) {
              enqueueSnackbar('Your password reset success!', {
                variant: 'success',
                autoHideDuration: 3000,
                anchorOrigin: {horizontal: 'right', vertical: 'top'}
              })
              setTimeout(() => {
                navigate('/login')
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
                    <InputLabel htmlFor="pwd-reset">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.pwd && errors.pwd)}
                      id="pwd-reset"
                      type="text"
                      value={values.pwd}
                      name="pwd"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      placeholder="Enter password"
                    />
                  </Stack>
                  {touched.pwd && errors.pwd && (
                    <FormHelperText error id="helper-text-pwd-reset">
                      {errors.pwd}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="confirmPwd-reset">Confirm Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.confirmPwd && errors.confirmPwd)}
                      id="confirmPwd-reset"
                      type="text"
                      value={values.confirmPwd}
                      name="confirmPwd"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter confirm password"
                    />
                  </Stack>
                  {touched.confirmPwd && errors.confirmPwd && (
                    <FormHelperText error id="helper-text-confirmPwd-reset">
                      {errors.confirmPwd}
                    </FormHelperText>
                  )}
                </Grid>

                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                      Reset Password
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
        <SnackbarProvider/>
      </>
  )
}

export default AuthResetPassword
