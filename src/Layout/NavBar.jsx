import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useCurrentUser from '../Components/useCurrentUser';
const NavBar = () => {
    const [currentUser] = useCurrentUser();
    const navigate = useNavigate();

    const {user,logout }= useContext(AuthContext)
    console.log(user);

    const handleLogout= ()=>{
        logout()
        .then(()=>{
            console.log('Logged out successfully');
        })
    }
    
    const links = <div className='flex gap-5 text-xl justify-start'>
        <NavLink>Home</NavLink>
        {
            user?<div className='flex gap-2'>
                <Link to='/dashboard'>DashBoard</Link>
                <Link >Available Coin {currentUser.coin}</Link>
            </div>:<div className='flex gap-2'>
                 <NavLink to='/login'>Login</NavLink>
                 <NavLink to='/register'>Register</NavLink>
            </div>
        }
        <div ><a href='https://github.com/Osman-Goni22/'>Join as Developer</a></div>
    </div>

    return (
        
            <div className="navbar  bg-teal-700  ">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className='navbar-end'>
              
              {
                user?   <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src={user.photoURL} />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                        <a className="justify-between">
                           {user.displayName}
                            <span className="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li onClick={handleLogout}><a>Logout</a></li>
                </ul>
            </div>:<div className='flex gap-2'>
                <FaUserCircle className='text-2xl'></FaUserCircle>
            <Link to='/login'>Login</Link>
            </div>
              }

                </div>
            </div>
       

    );
};

export default NavBar;