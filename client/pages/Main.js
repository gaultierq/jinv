/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Project from '../pages/Project'
import Home from '../pages/Home'
import { Switch, Route } from 'react-router-dom';

export default class Main extends React.Component {

    render() {

        const containerStyle = {
            marginTop: "60px"
        };

        return (
            <main class="container" style={containerStyle}>
                <div class="row">
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        {/*<Route path='/project' component={Project}/>*/}
                    </Switch>
                </div>
            </main>
        );
    }
}