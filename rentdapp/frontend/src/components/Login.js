//登入頁面
import React from "react";
import "./Login.css"
import { useAuth0 } from '@auth0/auth0-react'
import {FaUserEdit} from 'react-icons/fa'

function Login() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
        !isAuthenticated && (
            <>
            <div id="logintitle">Welcome</div>
            <button id="loginbutton" class="button is-warning" onClick={loginWithRedirect}>
                <FaUserEdit color="#585858" size={70} />
                註冊/登入
            </button>
            </>
        )
    )
}
export default Login