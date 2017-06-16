/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import Project from "./Project";
import { connect } from "react-redux"

import { fetchProjects, addProject } from "../actions/projectActions"
import {FlatButton, GridList, GridTile, Subheader} from "material-ui";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';

@connect((store) => {
    return {
        projects: store.project.projects,
    };
})
export default class Home extends React.Component {

    // state = {
    //     open: false
    // };

    constructor() {
        super();
        this.state = {
            open: false
        };
    }


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

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleAdd() {
        this.addProject();
        this.handleClose();
    }

    render() {
        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                overflowY: 'auto',
            },
            button: {
                margin: 12
            },
            home: {margin: 40},
            floating: {
                marginRight: 20,
                float: 'right'
            }
        };

        const { projects } = this.props;

        const actions = [
            // eslint-disable-next-line react/jsx-key
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
            // eslint-disable-next-line react/jsx-key
            <FlatButton
                label="Add"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleAdd.bind(this)}
            />,
        ];

        return (
            <div>
                <div style={styles.home}>
                    <h2>Projects</h2>
                    <GridList
                        cellHeight={180}
                        cols={4}
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

                    {/*<div>*/}
                    {/*<TextField hintText="Project title"onChange={ this.handleTitleChange.bind(this) } /> <br/>*/}
                    {/*<TextField hintText="Project description"onChange={ this.handleDescChange.bind(this) } /> <br/>*/}
                    {/*<RaisedButton label="Add" style={styles.button} onClick={this.addProject.bind(this)} />*/}
                    {/*</div>*/}

                </div>
                <FloatingActionButton style={styles.floating} onClick={this.handleOpen.bind(this)}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title="Add a new project"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField hintText="Project title"onChange={ this.handleTitleChange.bind(this) } /> <br/>
                    <TextField hintText="Project description"onChange={ this.handleDescChange.bind(this) } /> <br/>
                </Dialog>
            </div>
        );
    }
}