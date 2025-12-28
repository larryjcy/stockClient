import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

// material-ui
import { useTheme } from '@mui/material/styles'
import { useMediaQuery, Box, Toolbar } from '@mui/material'

// project import
import { useUserContext } from "../../context/UserContext"

import Drawer from './Drawer'
import Header from './Header'
import HorizontalBar from './Drawer/HorizontalBar'

import useConfig from 'hooks/useConfig'
import { MenuOrientation } from 'config'

// ==============================|| MAIN LAYOUT ||============================== //

const DashboardLayout = () => {
    const {updateDrawerOpen} = useUserContext()
    const theme = useTheme()
    const matchDownXL = useMediaQuery(theme.breakpoints.down('xl'))
    const downLG = useMediaQuery(theme.breakpoints.down('lg'))

    const { miniDrawer, menuOrientation } = useConfig()

    const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG

    // set media wise responsive drawer
    useEffect(() => {
    if (!miniDrawer) {
      // handlerDrawerOpen(!matchDownXL)
        updateDrawerOpen(!matchDownXL)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownXL])


  return (
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Header />
        {!isHorizontal ? <Drawer /> : <HorizontalBar />}

        <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
            <Toolbar />
            <Outlet />
        </Box>
      </Box>
  )
}

export default DashboardLayout
