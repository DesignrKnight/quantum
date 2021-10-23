/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import 'assets/css/nucleo-icons.css';
import 'assets/scss/blk-design-system-react.scss?v=1.2.0';
import 'assets/demo/demo.css';

import Index from 'views/Index.js';
import LandingPage from 'views/examples/LandingPage.js';
import RegisterPage from 'views/examples/RegisterPage.js';
import ProfilePage from 'views/examples/ProfilePage.js';

ReactDOM.render(
	<Auth0Provider
		domain="nitrone.eu.auth0.com"
		clientId="fYN6dlRif5AZ0Yd161L5k6BHVYtagxo9"
		redirectUri={window.location.origin}
	>
		<BrowserRouter>
			<Switch>
				<Route path="/" render={(props) => <Index {...props} />} />
				{/* <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      /> */}
				{/* <Redirect from="/" to="/components" /> */}
			</Switch>
		</BrowserRouter>
	</Auth0Provider>,
	document.getElementById('root')
);
