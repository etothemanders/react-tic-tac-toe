import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Game from './Game';
import NotFound from './NotFound';

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Game} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Router;
