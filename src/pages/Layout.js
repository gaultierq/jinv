/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default class Header extends React.Component {

    render() {
        return (
            <div>
                <Nav />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}