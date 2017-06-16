/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import Project from "./Project";
import { connect } from "react-redux"

import { fetchProjects, addProject } from "../actions/projectActions"
import {FlatButton, GridList, GridTile} from "material-ui";
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';

import SimpleStorageContract from '../../build/contracts/SimpleStorage.json'
import getWeb3 from '../utils/getWeb3'
import contract from "truffle-contract";

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

    componentWillMount() {

        this.props.dispatch(fetchProjects())


        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                });

                // Instantiate contract once web3 provided.
                this.instantiateContract()
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    instantiateContract() {
        /*
         * SMART CONTRACT EXAMPLE
         *
         * Normally these functions would be called in the context of a
         * state management library, but for convenience I've placed them here.
         */


        const simpleStorage = contract(SimpleStorageContract);
        simpleStorage.setProvider(this.state.web3.currentProvider);

        // Declaring this for later so we can chain functions on SimpleStorage.
        let simpleStorageInstance;

        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            simpleStorage.deployed().then((instance) => {
                simpleStorageInstance = instance;

                // Stores a given value, 5 by default.
                return simpleStorageInstance.set(50, {from: accounts[0]})
            }).then((result) => {
                // Get the value from the contract to prove it worked.
                return simpleStorageInstance.get.call(accounts[0])
            }).then((result) => {
                // Update state with the result.
                return this.setState({ storageValue: result.c[0] })
            })
        })
    }


    handleTitleChange(e) {
        this.setState({ newTitle: e.target.value });
    }

    handleDescChange(e) {
        this.setState({ newDesc: e.target.value });
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

                    <div className="pure-g">
                        <p>The stored value is: {this.state.storageValue}</p>
                    </div>

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