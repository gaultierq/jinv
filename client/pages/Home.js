/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import Project from "./Project";
import { connect } from "react-redux"

import { fetchProjects, addProject } from "../actions/project"

@connect((store) => {
    return {
        projects: store.project.projects.data,
    };
})
export default class Home extends React.Component {

    handleTitleChange(e) {
        this.setState({ newTitle: e.target.value });
    }

    handleDescChange(e) {
        this.setState({ newDesc: e.target.value });
    }

    componentWillMount() {
        this.props.dispatch(fetchProjects())
    }

    addProject() {
        //todo: inprove semantic
        this.props.dispatch(addProject({title: this.state.newTitle, desc: this.state.newDesc}));
    }

    render() {
        const { projects } = this.props;
        let Projects = null;
        if (projects) {
            Projects = projects.map((project, i) => <Project key={i} title={project.title} desc={project.desc}/> );
        }

        return (
            <home>
                <h2>Projects</h2>
                <div class="row">{Projects}</div>
                <div class="row">
                    <input placeholder="title" type="text" onChange={ this.handleTitleChange.bind(this) }/>
                    <input placeholder="description" type="text" onChange={ this.handleDescChange.bind(this) }/>
                    <button onClick={this.addProject.bind(this)}>Add a new project</button>
                </div>

            </home>
        );
    }
}