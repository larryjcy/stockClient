// import PropTypes from 'prop-types'
import React, {useContext, useState} from "react"
import { ACCESS_TOKEN } from "../constants/userConstants"
import Cookie from "js-cookie"
import PropTypes from "prop-types"
// import ProgramConfigApi from "../api/ProgramConfigApi"

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [sessionUser, setSessionUser] = useState()
  const [setting, setSetting] = useState()
  const [drawerOpen, setDrawerOpen] = useState()
  const [activeMenuId, setActiveMenuId] = useState()
  const [activeHorizontalMenuId, setActiveHorizontalMenuId] = useState()
  const [navAcl, setNavAcl] = useState([])

  // const loadSetting = useCallback(async () => {
  //   try {
  //     if (!setting) {
  //       const settingFilter = {
  //         access: 'public'
  //       }
  //       const settingResult = await ProgramConfigApi.getAllSetting(settingFilter)
  //       if (settingResult) {
  //         setSetting(settingResult)
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [])

  // useEffect(() => {
  //   loadSetting()
  // }, [loadSetting])

  const updateSessionUser = async (user) => {
    setSessionUser(user)
  }

  const getSessionUser = ( ) => {
    const token =  Cookie.get(ACCESS_TOKEN)
    if (!token) {
      return
    }
    return sessionUser
  }


  const updateSetting = (data) => {
    setSetting(data)
  }

  const getSetting = ( ) => {
    return setting
  }

  const updateDrawerOpen = (data) => {
    setDrawerOpen(data)
  }

  const getDrawerOpen = ( ) => {
    return drawerOpen
  }

  const updateActiveMenuId = (data) => {
    setActiveMenuId(data)
  }

  const getActiveMenuId = ( ) => {
    return activeMenuId
  }

  const updateActiveHorizontalMenuId = (data) => {
    setActiveHorizontalMenuId(data)
  }

  const getActiveHorizontalMenuId = ( ) => {
    return activeHorizontalMenuId
  }

  const updateAclNavIds = async (memberAcls) => {
    setNavAcl(memberAcls)
  }

  const getAclNavIds = ( ) => {
    return navAcl
  }

  return (
    <UserContext.Provider value={
      {
        updateSessionUser,
        getSessionUser,
        updateSetting,
        getSetting,
        updateDrawerOpen,
        getDrawerOpen,
        updateActiveMenuId,
        getActiveMenuId,
        updateActiveHorizontalMenuId,
        getActiveHorizontalMenuId,
        updateAclNavIds,
        getAclNavIds
      }
    }>
      {children}
    </UserContext.Provider>
  )
}
UserProvider.propTypes = {
  children: PropTypes.node
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
