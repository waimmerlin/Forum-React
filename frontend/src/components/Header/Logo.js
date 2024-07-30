import React from 'react';
import { FaReact } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="logo">
      <Link to={'/'}>
        <h1>  
            <FaReact />
            Forum React
        </h1>
      </Link>  
    </div>
  );
};

export default Logo;