import React from 'react'
import './nav.css'
import { assets } from '../../assets/assets'
const Nav = () => {
    return (
        <div className="nav">
            <div className='logo-container'>
                <img src={assets.survisai_logo} alt="" />
                <p>Survis AI</p>
            </div>
            <img src={assets.surajit} alt="" />
        </div>
    )
}

export default Nav
