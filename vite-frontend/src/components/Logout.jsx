import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const naviagtor = useNavigate()

    async function logout(e) {

        e.preventDefault()
        try {
            const response = await fetch("https://helpdesk-3b70.onrender.com/api/v1/users/logout", {
                method: "POST",
                credentials: "include"
            })

            const data = await response.json()

            if (!response.ok) {
                console.error("failed logout", data);
                return
            }
            
            naviagtor("/")

        } catch (error) {
            console.error("failed logout",error);
        }
    }


    return (
        <div>
            <button type='button'  onClick={logout}>Logout</button>
        </div>
    )
}

export default Logout
