import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Cookie from "js-cookie"
import { useUserContext } from "../context/UserContext"
import AuthApi from "../api/AuthApi"
import { ACCESS_TOKEN } from "../constants/userConstants"

/* eslint-disable react/prop-types */
const AuthGuard = ({component, navId}) => {/* eslint-disable react/prop-types */
    const navigate = useNavigate()
    const { getSessionUser } = useUserContext()
    const { updateSessionUser} = useUserContext()
    const { updateAclNavIds } = useUserContext()

    const cleanLogin = () => {
        Cookie.remove(ACCESS_TOKEN)
        window.location.href='/login'
    }

    useEffect(() => {
        const refreshMemberSession = async () => {
            const member = await AuthApi.getSessionMember()
            if (member) {
                await updateSessionUser(member)
            } else {
                cleanLogin()
            }
        }
        const token =  Cookie.get(ACCESS_TOKEN)
        if (token) {
            // check if refresh page clause usercontext lost
            const sessionUser = getSessionUser()
            if (!sessionUser) {
                refreshMemberSession()
            }
        } else {
            cleanLogin()
        }
    }, [getSessionUser, navigate, updateSessionUser, navId, updateAclNavIds])

    return <React.Fragment>{component}</React.Fragment>
}

export default AuthGuard