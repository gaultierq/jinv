/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import { deleteProject} from "../actions/projectActions"
import { connect } from "react-redux"
import { Button } from 'react-toolbox/lib/button';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

@connect()
export default class Project extends React.Component {

    render() {
        const { title, desc} = this.props;

        return (
            <div>
                <Card>
                    <CardHeader title={title} avatar="//placeimg.com/800/450/nature" />
                    <CardText>{desc}</CardText>
                    <Button label="delete" onClick={this.delete.bind(this)} raised primary />
                </Card>
            </div>
        );
    }

    delete() {
        console.log(`deleting project: ${JSON.stringify(this.props)} with key ${this.props.id}`);
        this.props.dispatch(deleteProject(this.props.id))
    }
}