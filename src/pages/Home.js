/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import Project from "./Project";

export default class Home extends React.Component {

    render() {

        const Projects = [
            "Some Article",
            "Some Other Article",
            "Yet Another Article",
            "Still More",
            "Fake Article",
            "Partial Article",
            "American Article",
            "Mexican Article",
        ].map((title, i) => <Project key={i} title={title} desc={title + " desc"}/> );

        return (
            <home>
                <h2>this is home</h2>
                <div class="row">{Projects}</div>
            </home>
        );
    }
}