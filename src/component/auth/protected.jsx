import React, { useEffect, useReducer, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";


const protectedRoutes = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authToken = JSON.parse(sessionStorage.getItem('authToken'))
                if (authToken) {
                    const response = await axios.get('https://library-auth-microservices.onrender.com/auth/authenticate', { headers: { Authorization: `Bearer ${authToken.token}` } })
                    const user = response.data
                    if (user.role == 'admin') {
                        sessionStorage.setItem('uId', user.email)
                        setIsAuthorized(true)
                        return
                    } else {
                        alert('User Not Authorized')
                        sessionStorage.clear()
                        setIsAuthorized(false)
                        return
                    }
                } else {
                    sessionStorage.clear()
                    setIsAuthorized(false)
                    return
                }

            } catch (error) {
                console.log(error.message)
                setIsAuthorized(false)
            }
        }

        checkAuth()
    })

    if (isAuthorized == null) {
        return <div>Loading.....</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}


export default protectedRoutes