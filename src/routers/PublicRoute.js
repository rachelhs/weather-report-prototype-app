import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ 
    isAuthenticated, 
    uid,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Redirect to='/landing'/>
        ) : (
            <div>
            <Component {...props}/>
            </div>
        )
    )}/>
);


const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    uid: state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);