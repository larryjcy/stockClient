// material-ui
import {  useMediaQuery } from '@mui/material'

import useConfig from 'hooks/useConfig'
import DrawerHeader from 'layout/Dashboard/Drawer/DrawerHeader'

import { MenuOrientation } from 'config'

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const {  menuOrientation } = useConfig()

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
    </>
  )
}

export default HeaderContent
