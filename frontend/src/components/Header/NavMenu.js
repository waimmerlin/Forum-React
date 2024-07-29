import React from 'react';
import Avatar from './Avatar';
import profilePicture from "../../assets/images/Mariposa.jpg"
import { NavLink } from 'react-router-dom';

const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active-link">Главная</NavLink>
        </li>
        <li>
          <NavLink to="/categories" activeClassName="active-link">Категории</NavLink>
        </li>
        <li>
          <NavLink to="/new-topics" activeClassName="active-link">Новые темы</NavLink>
        </li>
        <li>
          <NavLink to="/popular-topics" activeClassName="active-link">Популярные темы</NavLink>
        </li>
        <li>
          <NavLink to="/messages" activeClassName="active-link">Сообщения</NavLink>
        </li>
        <li>
          <NavLink to="/notifications" activeClassName="active-link">Уведомления</NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName="active-link">
            <Avatar src={profilePicture} alt="User Avatar" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
