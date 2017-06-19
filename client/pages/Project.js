/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import { deleteProject, createToken, deployToken} from "../actions/projectActions"
import { connect } from "react-redux"
import { Button } from 'react-toolbox/lib/button';
import {Card, CardHeader, CardText} from 'material-ui/Card';

@connect()
export default class Project extends React.Component {


    render() {
        let { _id, title, desc, token} = this.props.project;

        let tokenInfo;

        if (token) {
            const address = token.contract.address;
            if (address) {
                tokenInfo = <CardText>Token available: ${address}</CardText>;
            }
            else {
                tokenInfo = <Button label="deploy token" onClick={() => this.deployToken(_id, token)} raised primary/>;
            }
        }
        else {
            tokenInfo = <Button label="create token" onClick={() => this.createToken(_id)} raised primary/>;
        }
        return (
            <div>
                <Card style={{height: 200}}>
                    <CardHeader title={title} avatar="//placeimg.com/800/450/nature" />
                    <CardText>{desc}</CardText>
                    <Button label="delete" onClick={ () => this.delete(_id)} raised /><br/>
                    {tokenInfo}
                </Card>
            </div>
        );
    }

    delete(_id) {
        console.log(`deleting project: ${JSON.stringify(this.props)} with key ${_id}`);
        this.props.dispatch(deleteProject(_id));
    }

    createToken(_id) {
        console.log(`creating token: ${JSON.stringify(this.props)} with key ${_id}`);
        this.props.dispatch(createToken(_id))
    }

    deployToken(_id, token) {

        console.log(`deploying token: ${JSON.stringify(token)}`);
        this.props.dispatch(deployToken(token, _id))
    }

}