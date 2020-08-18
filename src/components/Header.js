import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header className="header">
        <div className="content-container">
        <div className="header__content"> 
            <button className="button--link" onClick={startLogout}>Logout</button>
        </div>
        </div>
    </header>
);

const mapDispatchtoProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchtoProps)(Header);