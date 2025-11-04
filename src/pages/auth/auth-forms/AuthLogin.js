import React from 'react'
import { useNavigate } from 'react-router-dom'

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  Checkbox,
  FormControlLabel,
  Stack,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'
import Cookie from "js-cookie"

// project import
import AnimateButton from 'components/@extended/AnimateButton'

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import AuthApi from '../../../api/AuthApi'
import util from "../../../utils/util"

import { ACCESS_TOKEN } from "../../../constants/userConstants"

const AuthLogin = () => {
  const navigate = useNavigate()
  const [keepSignIn, setKeepSignIn] = React.useState(false)

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(50).required('Username is required'),
          password: Yup.string().max(16).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const data = {
            ...values,
            keepSignIn
          }
          const result = await AuthApi.login(data)
          if (result && result.status === 201 ) {
            const expireTime = util.getLaterTimeByFormat(result.data['timeFormat'], result.data['expireTime']) //result.data['expireTime']
            Cookie.set(ACCESS_TOKEN, result.data['access_token'], {expires: expireTime})
            const defaultLink = '/'
            navigate(defaultLink)
          } else {
            setStatus({success: false})
            setErrors({username: result.data.message})
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
                  <InputLabel htmlFor="username-login">Username</InputLabel>
                  <OutlinedInput
                    id="username-login"
                    type="username"
                    value={values.username}
                    name="username"
                    inputProps={{ 'data-testid': 'username' }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Username"
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                  />
                  {touched.username && errors.username && (
                    <FormHelperText error id="standard-weight-helper-text-username-login">
                      {errors.username}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    inputProps={{ 'data-testid': 'password' }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                      control={
                        <Checkbox
                            checked={keepSignIn}
                            onChange={(event) => setKeepSignIn(event.target.checked)}
                            name="keepSignIn"
                            inputProps={{'data-testid': 'keepSignIn'}}
                            color="primary"
                            size="small"
                        />
                      }
                      label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} data-testid="login-button" fullWidth size="large" type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}

export default AuthLogin
