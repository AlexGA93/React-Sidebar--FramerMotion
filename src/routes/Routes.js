import React from 'react';
import {Switch, Route} from 'react-router-dom';

// pages
import Home from '../pages/Home/Home';
import Add from '../pages/Add/Add';
import Delete from '../pages/Delete/Delete';
import Edit from '../pages/Edit/Edit';
import Logout from '../pages/Logout/Logout';
import View from '../pages/View/View';

export default function Routes(){
    return (
        <Switch>
            <Route path="/" exact >
                <Home />
            </Route>
            <Route path="/add" exact >
                <Add />
            </Route>
            <Route path="/delete" exact >
                <Delete />
            </Route>
            <Route path="/edit" exact >
                <Edit />
            </Route>
            <Route path="/logout" exact >
                <Logout />
            </Route>
            <Route path="/view" exact >
                <View />
            </Route>
        </Switch>
    );
}