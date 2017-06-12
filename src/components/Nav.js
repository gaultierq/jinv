/**
 * Created by qg on 12/06/17.
 */
import React from 'react';
import { Link } from 'react-router-dom'

export default class Nav extends React.Component {

    render() {
        return (
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/project'>Project</Link></li>
                </ul>
            </nav>
        );
    }
}