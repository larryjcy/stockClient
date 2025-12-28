// material-ui
import { Grid, Typography, Stack } from '@mui/material'

// project import
import AuthWrapper from './AuthWrapper'
import AuthCodeVerification from './auth-forms/AuthCodeVerification'
import {Link, useParams} from "react-router-dom"
import React from "react"
// ================================|| CHECK MAIL ||================================ //

const CheckCode = () => {
  const { token } = useParams()
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h3">Enter Verification Code</Typography>
            <Typography
                component={Link}
                to={'/login'}
                variant="body1"
                sx={{ textDecoration: 'none' }}
                color="primary"
            >
              Back to Login
            </Typography>
            <Typography color="secondary">We send you on SMS.</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography>A verification code has been sent to your phone via SMS. Please check your messages.</Typography>
        </Grid>
        <Grid item xs={12}>
          <AuthCodeVerification token={token}/>
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}

export default CheckCode
