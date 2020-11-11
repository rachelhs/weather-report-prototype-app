import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import { startSetEntries } from './actions/entries';
import LoadingPage from './components/Pages/LoadingPage';

const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/intro');
            }

    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }

    // logs user out automatically after 30 minutes
    // glitchy

    // let userSessionTimeout = null;
    // if (user === null && userSessionTimeout) {
    //     clearTimeout(userSessionTimeout);
    //     userSessionTimeout = null;
    //   } else {
    //     user.getIdTokenResult().then((idTokenResult) => {
    //       const authTime = idTokenResult.claims.auth_time * 1000;
    //       const sessionDurationInMilliseconds = 30 * 60 * 1000; // half an hour
    //       const expirationInMilliseconds = sessionDurationInMilliseconds - (Date.now() - authTime);
    //       userSessionTimeout = setTimeout(() => firebase.auth().signOut(), expirationInMilliseconds);
    //     });
    //   }

});