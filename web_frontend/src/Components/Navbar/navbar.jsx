import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import {Link} from 'react-router-dom'
import {assets} from '../../assets/assets';
import './navbar.css'

const Navbar = () => {
    return (
        <div className='navbar' >
            <div className="left">
                <img src={assets.foododonar} alt="logo" />
                <Link to='/'>KindMeals</Link>
            </div>
            <ul className='middle'>

                <Link to='/'>Home</Link>
                <Link to='/services'>Services</Link>
                <Link to='/adddonation'>Add a Donation</Link>
                <Link to='/livedonations'>Live Donations</Link>
                <Link to='/volunteer'>Volunteer</Link>
                <Link to='/charity'>Charity</Link>
                <Link to='/enquire'>Enquire</Link>
            </ul>

            <ul className='right'>
                <li><Link to = '/language'><span><img src={assets.language} alt="change language" /></span></Link></li>
                <li><Link to = '/donorprofile'><span><img src={assets.profile} alt="profile" /></span></Link></li>
            </ul>
        </div>
    )
}

export default Navbar;