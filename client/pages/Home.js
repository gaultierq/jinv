/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import Project from "./Project";
import { connect } from "react-redux"

import { fetchProjects, addProject } from "../actions/projectActions"
import {GridList, GridTile, Subheader} from "material-ui";

@connect((store) => {
    return {
        projects: store.project.projects,
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
        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                width: '100%',
                overflowY: 'auto',
            },
        };

        const { projects } = this.props;

        return (
            <home style={styles.home}>
                <h2>Projects!</h2>
                <GridList
                    cellHeight={180}
                    style={styles.gridList}
                >
                    {projects.map((project) => (
                        <div key={project._id}>
                            <GridTile>
                                <Project key={project._id} id={project._id} title={project.title} desc={project.desc}/>
                            </GridTile>
                        </div>
                    ))}
                </GridList>


                <div class="row">
                    <input placeholder="title" type="text" onChange={ this.handleTitleChange.bind(this) }/>
                    <input placeholder="description" type="text" onChange={ this.handleDescChange.bind(this) }/>
                    <button class="btn btn-default" onClick={this.addProject.bind(this)}>Add a new project</button>
                </div>

            </home>
        );
    }
}