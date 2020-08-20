import { Router, Route, Switch, Link, NavLink } from 'react-router-dom'
import React from 'react';
import LandingPage from '../components/LandingPage'
import EditEntryPage from '../components/EditEntry'
import HelpPage from '../components/HelpPage'
import NotFound from '../components/NotFound'
import LoginEmailForm from '../components/LoginEmailForm'
import createHistory from 'history/createBrowserHistory'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import ChooseSymbolPage from '../components/ChooseSymbolPage'

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginEmailForm} exact={true} />
                <PrivateRoute path="/landing" component={LandingPage}/>
                <PrivateRoute path="/choosesymbol" component={ChooseSymbolPage}/>
                <PrivateRoute path="/edit/:id" component={EditEntryPage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;