/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import Project from "./Project";
import { connect } from "react-redux"

import { fetchProjects } from "../actions/project"

@connect((store) => {
    return {
        projects: store.project.projects,
    };
})
export default class Home extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchProjects())
    }

    render() {
        const { projects } = this.props;

        const Projects = projects.map((title, i) => <Project key={i} title={title} desc={title + " desc"}/> );

        return (
            <home>
                <h2>Projects</h2>
                <div class="row">{Projects}</div>
            </home>
        );
    }
}