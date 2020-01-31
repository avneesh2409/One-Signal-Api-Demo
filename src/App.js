import React from 'react';

import Login from './components/login';
import Dashboard from './components/dashboard';
import NewPush from './components/newPush';
import { toast, ToastContainer } from 'react-toastify';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

toast.configure({
    autoClose: 0,
    draggable: false
})

export default () => {
    const LoggedIn = localStorage.getItem('token')
    return (
        <div>
            <ToastContainer />
            <Router>
                {(!LoggedIn) ?
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/login" exact component={Login} />
                    </Switch>
                    :
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/new-push" exact component={NewPush} />
                    </Switch>
                }

            </Router>
        </div>
    )
}




