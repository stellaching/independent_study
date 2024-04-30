//登出頁面
import React from "react";
import "./Logout.css"
import { useAuth0 } from '@auth0/auth0-react'
import {CgArrowTopRight} from 'react-icons/cg'

function Logout() {
    const { logout, isAuthenticated } = useAuth0();
    
    return (
        isAuthenticated && (
            <div>
                <button id="logoutbutton" class="button is-warning" onClick={logout}> 
                    <CgArrowTopRight color="#000051" size={125} />登出
                </button>
            </div>
        )
    )
}
export default Logout
