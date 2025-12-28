// material-ui
import { Grid, Stack, Typography } from '@mui/material'

// project import
import AuthWrapper from './AuthWrapper'
import AuthResetPassword from './auth-forms/AuthResetPassword'
import {useCallback, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import AuthApi from "../../api/AuthApi"

// ================================|| RESET PASSWORD ||================================ //

const ResetPassword = () => {
  const { token } = useParams()
  const { code } = useParams()

  const [verified, setVerified] = useState(false)

  const getInit = useCallback(async () => {
    if (token) {
      let response = await AuthApi.verifyToken(token)
      if (response && response.status === 200) {
        setVerified(true)
      }
    }
  })

  useEffect(() => {
    getInit()
  }, [getInit])

  return (
      <AuthWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack sx={{mb: {xs: -0.5, sm: 0.5}}} spacing={1}>
              <Typography variant="h3">Reset Password</Typography>
              {(verified) &&
                <Typography color="secondary">Please choose your new password</Typography>
              }
            </Stack>
          </Grid>
          {(verified) &&
            <Grid item xs={12}>
              <AuthResetPassword
                token={token}
                code={code}
              />
            </Grid>
          }
          {(!verified) &&
              <Grid item xs={12}>
                <Stack sx={{mb: {xs: -0.5, sm: 0.5}}} spacing={1}>
                  <Typography color="secondary">Please check your phone for the SMS with your verification code.</Typography>
                </Stack>
              </Grid>
          }
        </Grid>
      </AuthWrapper>
  )
}

export default ResetPassword
