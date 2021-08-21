import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Broadcast from './Broadcast';
import Viewer from './Viewer';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Broadcast} />
                <Route  path='/viewer' component={Viewer} />
            </Switch>
        </Router>
    )
}

export default AppRouter
