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
    </nav>
  );
};

export default NavMenu;
