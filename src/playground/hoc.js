// Higher Order Component - A component that renders another component
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please don't share.</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (
            <WrappedComponent {...props} />
            ) : (
                <p>please log in</p>
            )}
        </div>
    );
};

//requireAuthentication
const AuthInfo = requireAuthentication(Info);
const AdminInfo = withAdminWarning(Info);

//ReactDOM.render(<AdminInfo isAdmin={false} info="very much"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="very much" />, document.getElementById('app'));