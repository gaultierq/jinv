/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Project from '../pages/Project'
import Home from '../pages/Home'
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Main extends React.Component {

    render() {


        return (
            <main>
                <MuiThemeProvider>
                    <div>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                        </Switch>
                    </div>
                </MuiThemeProvider>
            </main>
    );
    }
    }