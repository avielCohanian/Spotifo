import React from 'react';
import { Link } from 'react-router-dom';

export const MenuMobile = ({ toggleMenu, onSetLang }) => {
  return (
    <section className="menu">
      <a className="close" onClick={toggleMenu}>
        X
      </a>

      <div className="menu-container">
        <div className="login-container">
          <Link to="/" data-trans="login" onClick={toggleMenu}>
            Login
          </Link>
          <Link to="/" data-trans="sign-up" onClick={toggleMenu}>
            SignUp
          </Link>
          --
        </div>
        <select id="inputState" className="form-control-xsm" onChange={(ev) => onSetLang(ev)}>
          <option value="en">English</option>
          <option value="he">עברית</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    </section>
  );
};
