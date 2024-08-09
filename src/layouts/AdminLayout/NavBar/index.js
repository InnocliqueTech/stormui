import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import NavLeft from './NavLeft';
import NavRight from './NavRight';
import NavMiddle from './NavMiddle'

import { ConfigContext } from '../../../contexts/ConfigContext';
import * as actionType from '../../../store/actions';
import { Image } from 'react-bootstrap';
import logo from '../../../assets/images/logo-white.png';
import secondLogo from './image6-removebg-preview.png'; // Import your second logo

const NavBar = () => {
  const [moreToggle, setMoreToggle] = useState(false);
  const configContext = useContext(ConfigContext);
  const { collapseMenu, headerFixedLayout, layout } = configContext.state;
  const { dispatch } = configContext;
  const location = useLocation(); // Get the current location

  let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg'];
  if (headerFixedLayout && layout === 'vertical') {
    headerClass.push('headerpos-fixed');
  }

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass.push('on');
  }

  const navToggleHandler = () => {
    dispatch({ type: actionType.COLLAPSE_MENU });
  };

  let moreClass = ['mob-toggler'];

  let collapseClass = ['collapse navbar-collapse'];
  if (moreToggle) {
    moreClass.push('on');
    collapseClass.push('show');
  }

  const showSecondLogo = true; // Condition to determine if second logo should be shown
  const showLogos = location.pathname !== '/app/dashboard/location'; // Condition to show logos on all pages except '/app/dashboard/location'

  return (
    <header className={headerClass.join(' ')}>
      <div className="m-header">
        <Link to="#" className={toggleClass.join(' ')} onClick={navToggleHandler}>
          <span />
        </Link>
        {/* Original logo */}
        <span className="b-title"></span>

        <Image src={logo} style={{ height: 50, width: 100 }} alt="First logo" />
        {showSecondLogo && showLogos && (
          <Link to="#" className="b-brand">
            <Image src={secondLogo} style={{ height: 50, width: 100 }} alt="logo" />
            {/* Second logo */}

            <span className="b-title"></span>
          </Link>
        )}
        <Link to="#" className={moreClass.join(' ')} onClick={() => setMoreToggle(!moreToggle)}>
          <i className="feather icon-more-vertical" />
        </Link>
      </div>
      <div style={{ justifyContent: 'space-between' }} className={collapseClass.join(' ')}>
        <NavLeft />
        <NavMiddle/>
        <NavRight />
      </div>
    </header>
  );
};

export default NavBar;
