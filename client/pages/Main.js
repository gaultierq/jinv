/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import Home from '../pages/Home'
import { Switch, Route } from 'react-router-dom';

export default class Main extends React.Component {

    render() {
        return (
            <main>
                <div>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                    </Switch>
                </div>
            </main>
        );
    }
}