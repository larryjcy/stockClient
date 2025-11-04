// material-ui
// import { useTheme } from '@mui/material/styles'
// import { useMediaQuery } from '@mui/material'
import {
    Box
} from '@mui/material'
// project import
 import Navigation from './Navigation'
import SimpleBar from 'components/third-party/SimpleBar'

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  // const theme = useTheme()
  // const { menuMaster } = useGetMenuMaster()
  // const drawerOpen = menuMaster.isDashboardDrawerOpened
  // const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <>
      <SimpleBar
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            }
        }}
      >
            <Box sx={{ mt: 1 }}/>
            <Navigation />
            <Box sx={{ mb: 2 }}/>
        </SimpleBar>
    </>
  )
}

export default DrawerContent
