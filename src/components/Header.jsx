import React from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'
import { LogOut, LogIn } from 'react-feather'
import logo from "../assets/icon.png"

const Header = () => {
    const {user, handleLogout} = useAuth()
  return (
    <div id="header--wrapper">
        {user ? (
            <div className='flex justify-between p-2 items-center '>
                Welcome {user.name}
                <img className='h-12 object-cover' src={logo} />
                <LogOut className="header--link" onClick={handleLogout}/>
            </div>
        ): (
            <>
                <Link to="/">
                    <LogIn className="header--link"/>
                </Link>
            </>
        )}
    </div>
  )
}

export default Header
