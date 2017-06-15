/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import { deleteProject} from "../actions/projectActions"
import { connect } from "react-redux"
import { Button } from 'react-toolbox/lib/button';
//import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


@connect()
export default class Project extends React.Component {

    render() {

        const { title, desc} = this.props;

        return (
            <Card style={{width: '250px'}} >
                <CardHeader
                    title="Quentin"
                    avatar="https://placeimg.com/800/450/nature"
                />
                <CardMedia
                    overlay={<CardTitle title={title} subtitle={desc} />}
                >
                    <img src="https://placeimg.com/800/450/nature" alt="" />
                </CardMedia>
                <CardText>{desc}</CardText>
                <CardActions >
                    <Button label="delete" onClick={this.delete.bind(this)} raised primary />
                </CardActions>
            </Card>
        );
    }

    delete() {
        console.log(`deleting project: ${JSON.stringify(this.props)} with key ${this.props.id}`);
        this.props.dispatch(deleteProject(this.props.id))
    }
}