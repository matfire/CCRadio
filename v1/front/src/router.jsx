import React from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import RadioCreate from './pages/radioCreate'
import Radio from './pages/Radio'

const AuthRoute = ({path, exact, component}) => {
	return localStorage.getItem("jwt") ? <Route path={path} component={component} exact={exact} /> : <Redirect to="/login" />
}

const Routers = ({authenticated}) => {
	return <Router>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/login" exact component={Login} />
			<Route path="/register" exact component={Register} />
			<AuthRoute path="/radio/create" exact component={RadioCreate} />
			<AuthRoute path="/radio/:id/modify" exact />
			<Route path="/radio/:id" component={Radio} />
		</Switch>
	</Router>
}

export default Routers