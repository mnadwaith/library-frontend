import './login.css'
import React, { useState } from 'react'
import protectedRoutes from './protected'

const LogIn = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("adwaith.nambiar@securra.com")
    const [password, setPassword] = useState("admin123")


    const authenticate = async () => {
        setLoading(true)
        try {
            const response = await fetch("https://library-auth-microservices.onrender.com/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                const data = await response.json()
                sessionStorage.setItem('authToken', JSON.stringify(data))
                window.location.href = "/dashboard";
            } else {
                alert("Wrong credentials")
            }


        } catch (error) {
            console.error('Error during login:', error);
            alert("Servers are offline")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div id='login' className="d-flex justify-content-center align-items-center">
                <div className='row'>
                    <div className='col-12'>
                        <h2 className="text-center mb-4">Login</h2>
                        <input
                            type="email"
                            className='form-control border-dark w-100'
                            placeholder="Enter your username"
                            defaultValue={"adwaith.nambiar@securra.com"}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <input
                            type="password"
                            className='form-control border-dark w-100 mt-3'
                            placeholder="Enter your password"
                            defaultValue={"admin123"}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <button
                            className='btn btn-primary w-100 mt-4'
                            onClick={authenticate}
                        >
                            {loading ? "Loging in...." : "Login"}
                        </button>
                    </div>
                </div>
            </div>




        </>
    )
}

export default LogIn