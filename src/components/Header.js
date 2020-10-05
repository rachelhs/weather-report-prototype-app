import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth'
import { Link } from 'react-router-dom';


export const Header = ({ startLogout }) => (
    <header className="header">
        <div className="content-container">
        <div className="header__content"> 
            <Link className="button--link" to={{ pathname: '/report' }}>REPORT</Link>
            <Link className="first-aid-button" to={{ pathname: '/first-aid' }}>
                <div className="leftright"></div>
                <div className="rightleft"></div>
            </Link>
            <button className="button--link">MENU</button>
        </div>
        </div>
    </header>
);

const mapDispatchtoProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchtoProps)(Header);