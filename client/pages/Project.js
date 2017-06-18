/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import { deleteProject, createToken} from "../actions/projectActions"
import { connect } from "react-redux"
import { Button } from 'react-toolbox/lib/button';
import {Card, CardHeader, CardText} from 'material-ui/Card';

@connect()
export default class Project extends React.Component {

    render() {
        let project = this.props.project;

        const { title, desc, token} = project;

        return (
            <div>
                <Card style={{height: 200}}>
                    <CardHeader title={title} avatar="//placeimg.com/800/450/nature" />
                    <CardText>{desc}</CardText>
                    <Button label="delete" onClick={this.delete.bind(this)} raised /><br/>
                    { token ? null : <Button label="createToken" onClick={this.createToken.bind(this)} raised primary />}
                </Card>
            </div>
        );
    }

    delete() {
        console.log(`deleting project: ${JSON.stringify(this.props)} with key ${this.props.id}`);
        this.props.dispatch(deleteProject(this.props.id));
    }

    createToken() {
        console.log(`creating token: ${JSON.stringify(this.props)} with key ${this.props.id}`);
        this.props.dispatch(createToken(this.props.id))
    }

}