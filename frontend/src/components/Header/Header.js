import React from 'react';
import Logo from './Logo';
import NavMenu from './NavMenu';
import ThemeToggleButton from './ThemeToggleButton';

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <NavMenu />
      {/* <ThemeToggleButton /> */}
    </header>
  );
};

export default Header;