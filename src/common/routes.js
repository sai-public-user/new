import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../components/Home/index';
import PageNotFound from '../components/PageNotFound/index';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/*" component={PageNotFound} />
	</Switch>
);

export default Routes;
