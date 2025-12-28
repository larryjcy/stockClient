
// material-ui
import {
  Grid,
   Typography
} from '@mui/material'

// project import
import MainCard from 'components/MainCard'

// assets


// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>


      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 3 */}
      <Grid item xs={12}  >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Appointments</Typography>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
            <></>
        </MainCard>
      </Grid>

    </Grid>
  )
}

export default DashboardDefault
