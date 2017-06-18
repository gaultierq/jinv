import axios from 'axios';

const APIURL = 'http://localhost:3000/api/';

export function fetchProjects() {
    const type = "FETCH_PROJECTS";

    return (dispatch) => {

        axios.get(APIURL + 'projects')
            .then((res) => {
                dispatch({
                    type: type,
                    payload: res.data
                });
            })/*.catch(() => {
            // eslint-disable-next-line no-console
            console.log("Error");
            dispatch({
                type: type,
                payload: "error"
            });
        })*/;
    }
}
export function addProject(newProject) {
    let {title, desc} = newProject;
    let type = "ADD_PROJECT";
    return (dispatch) => {
        axios.post('http://localhost:3000/api/project', {title, desc})
            .then((res) => {
                dispatch({
                    type: type,
                    payload: res.data
                });
            }).catch(() => {

                // eslint-disable-next-line no-console
                console.log("Error");
                dispatch({
                    type: type,
                    payload: "error"
                });
            });
    };
}

export function deleteProject(_id) {
    return (dispatch) => {
        let type = "DELETE_PROJECT";
        axios.delete('http://localhost:3000/api/project', {params: {_id}})
            .then((res) => {
                dispatch({
                    type: type,
                    payload: res.data
                });
            })
            .catch(() => {
                // eslint-disable-next-line no-console
                console.log("Error");
                dispatch({
                    type: type,
                    payload: "error"
                });
            });
    };

}

export function createToken(_id) {
    return (dispatch) => {
        let type = "CREATE_TOKEN";

        axios.post(APIURL + 'createToken', {_id})
            .then((res) => {
                dispatch({
                    type: type,
                    payload: res.data
                });
            }).catch(() => {
            console.log("Error");
            dispatch({
                type: type,
                payload: "error"
            });
        });

    };
}