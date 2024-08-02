import React, { useState } from 'react';
import Cookies from "js-cookie"
import Avatar from './Avatar';
import axios from 'axios';
import profilePicture from "../../assets/images/Mariposa.jpg"
import { NavLink } from 'react-router-dom';

import { IoMdNotificationsOutline } from "react-icons/io";
import { useAuth } from '../../hooks/useAuth';

const NavMenu = () => {
  const { user } = useAuth()

  return (
    <nav className="nav-menu">
      <ul>
        <li>
          <NavLink to="/categories" activeClassName="active-link">Articles</NavLink>
        </li>
        <li>
          <NavLink to="/new-topics" activeClassName="active-link">Socials</NavLink>
        </li>
        <li>
          <NavLink to="/messages" activeClassName="active-link">Messages</NavLink>
        </li>
        <li>
          {
            user ? 
            <div className='nav-profile'>
              <NavLink to="/notifications" activeClassName="active-link">{IoMdNotificationsOutline}</NavLink>
              <NavLink to="/profile" activeClassName="active-link" className="user-box">
                <span>{user.username}</span>
                <Avatar src={`data:image/*;base64,${user.avatar}`} alt="User Avatar" />
              </NavLink>
            </div>

            :
            <NavLink to="/login" activeClassName="active-link">
              Sign In
            </NavLink>
          }
        </li>
      </ul>
      <svg className='nav-menu-toggler' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="44" height="44" viewBox="0,0,256,256">
        <g fill="#4299e1" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{mixBlendMode: "normal"}}><g transform="scale(3.55556,3.55556)"><path d="M56,48c2.209,0 4,1.791 4,4c0,2.209 -1.791,4 -4,4c-1.202,0 -38.798,0 -40,0c-2.209,0 -4,-1.791 -4,-4c0,-2.209 1.791,-4 4,-4c1.202,0 38.798,0 40,0zM56,32c2.209,0 4,1.791 4,4c0,2.209 -1.791,4 -4,4c-1.202,0 -38.798,0 -40,0c-2.209,0 -4,-1.791 -4,-4c0,-2.209 1.791,-4 4,-4c1.202,0 38.798,0 40,0zM56,16c2.209,0 4,1.791 4,4c0,2.209 -1.791,4 -4,4c-1.202,0 -38.798,0 -40,0c-2.209,0 -4,-1.791 -4,-4c0,-2.209 1.791,-4 4,-4c1.202,0 38.798,0 40,0z"></path></g></g>
      </svg>  
    </nav>
  );
};

export default NavMenu;
