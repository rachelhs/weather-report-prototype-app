import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header className="header">
        <div className="content-container">
        <div className="header__content"> 
            <Link className="header__title" to="/landing">
                <h1>Weather Report</h1>
            </Link>
            <button className="button--link" onClick={startLogout}>Logout</button>
        </div>
        </div>
    </header>
);

const mapDispatchtoProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchtoProps)(Header);