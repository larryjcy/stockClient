import React, {  } from 'react'
import { useNavigate } from 'react-router-dom'

// material-ui
import {
    Button, 
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material'

// project import
import AnimateButton from 'components/@extended/AnimateButton'
import {Formik} from "formik"
import * as Yup from "yup"
import AuthApi from "../../../api/AuthApi"
import {enqueueSnackbar, SnackbarProvider} from "notistack"

// ============================|| STATIC - CODE VERIFICATION ||============================ //

const AuthCodeVerification = ({token}) => {
    const navigate = useNavigate()
    const hanldeResendCode = () => {
        console.log('resend ' + token)
    }

    return (
      <>
        <Formik
          initialValues={{
              code: '',
              submit: null
          }}
          validationSchema={Yup.object().shape({
              code: Yup.string().max(50).required('Verification code is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              const data = {
                  token: token,
                  code: values.code
              }
              const result = await AuthApi.verifyCode(data)
              if (result && result.status === 200 ) {
                  enqueueSnackbar('Verify code success!', {
                      variant: 'success',
                      autoHideDuration: 3000,
                      anchorOrigin: {horizontal: 'right', vertical: 'top'}
                  })
                  setTimeout(() => {
                      navigate('/resetPassword/' + token + '/' + values.code)
                  }, 2000)
              } else {
                  setStatus({success: false})
                  setErrors({submit: result.data.message})
                  setSubmitting(false)
              }
          }}
        >
          {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values }) => (
              <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                      <Grid item xs={12}>
                          <Stack spacing={1}>
                              <InputLabel htmlFor="code">Verification Code</InputLabel>
                              <OutlinedInput
                                  id="code"
                                  type="text"
                                  value={values.code}
                                  name="code"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Enter Verification Code"
                                  fullWidth
                                  error={Boolean(touched.code && errors.code)}
                              />
                              {touched.code && errors.code && (
                                  <FormHelperText error id="standard-weight-helper-text-code-login">
                                      {errors.code}
                                  </FormHelperText>
                              )}
                          </Stack>
                      </Grid>
                      {errors.submit && (
                          <Grid item xs={12}>
                              <FormHelperText error>{errors.submit}</FormHelperText>
                          </Grid>
                      )}
                      <Grid item xs={12}>
                          <AnimateButton>
                              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                                  Continue
                              </Button>
                          </AnimateButton>
                      </Grid>
                  </Grid>
              </form>
          )}
        </Formik>
        {(false) &&
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                    <Typography>Did not receive the message? </Typography>
                    <Typography  onClick={hanldeResendCode} variant="body1" sx={{ minWidth: 85, ml: 2, textDecoration: 'none', cursor: 'pointer' }} color="primary">
                        Resend code
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
        }
        <SnackbarProvider/>
      </>

    )
}

export default AuthCodeVerification
