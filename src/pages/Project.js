/**
 * Created by qg on 12/06/17.
 */

import React from 'react';

export default class Project extends React.Component {

    render() {

        const { title, desc} = this.props;
        //console.log(`rendering project with title=${ title } and desc=${ desc } `); // eslint-disable-line

        return (
            <project class="col-md-4">
                <h4>{title}</h4>
                <p>{desc}</p>
            </project>
        );
    }
}