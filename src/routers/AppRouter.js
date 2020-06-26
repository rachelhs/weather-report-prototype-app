import { Router, Route, Switch, Link, NavLink } from 'react-router-dom'
import React from 'react';
import DashboardPage from '../components/Dashboard'
import NotFound from '../components/NotFound'
import LoginPage from '../components/LoginPage'
import createHistory from 'history/createBrowserHistory'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={DashboardPage}/>
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;