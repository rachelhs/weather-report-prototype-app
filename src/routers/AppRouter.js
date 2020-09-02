import { Router, Route, Switch } from 'react-router-dom'
import React from 'react';
import LandingPage from '../components/Pages/LandingPage'
import HomePage from '../components/Home/HomePage'
import EditEntryPage from '../components/Edits/EditEntry'
import NotFound from '../components/Pages/NotFound'
import LoginEmailForm from '../components/Login/LoginEmailForm'
import createHistory from 'history/createBrowserHistory'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import ChooseSymbolPage from '../components/Pages/ChooseSymbolPage'
import LowRoute from '../components/Routes/LowRoute'
import MediumLowRoute from '../components/Routes/MediumLowRoute'
import Routes from '../components/Routes/AllRoutes'

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginEmailForm} exact={true} />
                <PrivateRoute path="/landing" component={LandingPage}/>
                <PrivateRoute path="/home" component={ HomePage }/>
                <PrivateRoute path="/choosesymbol" component={ChooseSymbolPage}/>
                <PrivateRoute path="/edit/:id" component={EditEntryPage} />
                <PrivateRoute path="/6" component={ MediumLowRoute } />
                <PrivateRoute path="/5" component={ LowRoute } />
                <PrivateRoute path="/allRoutes" component={ Routes } />

                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;