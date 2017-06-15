/**
 * Created by qg on 12/06/17.
 */

import React from 'react';
import { deleteProject} from "../actions/projectActions"
import { connect } from "react-redux"
import { Button } from 'react-toolbox/lib/button/Button';

@connect()
export default class Project extends React.Component {

    render() {

        const { title, desc} = this.props;
        //console.log(`rendering project with title=${ title } and desc=${ desc } `); // eslint-disable-line

        return (
            <project class="col-md-4">
                <h4>{title}</h4>
                <p>{desc}</p>
                <Button label="delete" onClick={this.delete.bind(this)}/>
            </project>
        );
    }

    delete() {
        console.log(`deleting project: ${JSON.stringify(this.props)} with key ${this.props.id}`);
        this.props.dispatch(deleteProject(this.props.id))
    }
}