import React from 'react'
import axios from 'axios'
import { backendUrl, getCSRFToken } from '../assets/scripts/utils'
import { Navigate } from 'react-router-dom'

export default function Logout() {

    const logout = () => {
        axios.post(`${backendUrl()}/logout`, {}, {  // Empty body
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),  // Include CSRF token
            },
            withCredentials: true  // Include cookies (sessionid)
        }).then((response) => {
            console.log('User logged out!')
            location.assign('/')
        }).catch((error) => {
            console.log(error.response)
            location.assign('/')
            
        })
    }
    logout();

    return (
        <div>

        </div>
    )
}
