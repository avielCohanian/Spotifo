import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useInput } from '../hooks/useInput ';
import { setFilterBy } from '../store/actions/itemAction';
import { debounce } from '../services/utilService';
import { MenuMobile } from './mobile/MenuMobile';

import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import SearchIcon from '@mui/icons-material/Search';
import { setLang } from '../services/i18nService';

export const AppHeader = () => {
  let location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();

  const search = useInput('');
  const [isScroll, setIsScroll] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', (ev) => {
      if (!window.scrollY) setIsScroll(false);
      else setIsScroll(true);
    });
  }, []);

  useEffect(() => {
    setSearch(search.value);
  }, [search]);

  const setSearch = debounce((search) => {
    dispatch(setFilterBy(search));
  }, 750);

  const emptyInput = () => {
    search.onChange({
      target: {
        value: '',
      },
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onSetLang = ({ target }) => {
    const lang = target.value;
    setLang(lang);
  };

  return (
    <>
      <header
        className={`app-header full web ${location.pathname.includes('/item/') ? '' : 'home'} ${
          isScroll ? '' : 'scroll'
        }`}
      >
        <div className="links">
          <NavLink className="simple-button" to="/item">
            <div className="arrow-container">
              <ArrowForwardIosIcon className="arrow-forward" />
            </div>
          </NavLink>
        </div>

        {location.pathname === '/search' && (
          <section className="search-container">
            <input type="text" placeholder="Artists, Songs Or podcasts" {...search} />
            <SearchIcon className="search" />
          </section>
        )}

        <Link className="simple-button" to="/">
          Logo
        </Link>
      </header>

      {!isMenuOpen ? (
        <header className={`app-header full mob ${location.pathname === '/search' ? 'search' : ''}`}>
          {location.pathname === '/search' ? (
            <section className="search-container-mob">
              <ArrowForwardSharpIcon className="arrow-icon icon" onClick={() => history.goBack()} />
              <input type="text" {...search} placeholder="Search" />
              <span className="cancel icon" onClick={() => emptyInput()}>
                X
              </span>
            </section>
          ) : (
            <>
              <Link className="nav-icon" to="/item">
                <img src={require('../assets/img/SpotifyLogo.svg').default} alt="" />
              </Link>
              <div className="top">
                <Link to="/search" onClick={() => setIsSearch(!isSearch)}>
                  <SearchSharpIcon className="search pointer" />
                </Link>
                <MenuSharpIcon className="menu-sharp pointer" onClick={toggleMenu} />
              </div>
            </>
          )}
        </header>
      ) : (
        <MenuMobile toggleMenu={toggleMenu} onSetLang={onSetLang} />
      )}
    </>
  );
};
