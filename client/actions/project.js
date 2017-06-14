import axios from 'axios';

export function fetchProjects() {
    const fixtures = [
        {title: "Some Article", desc: "Super cool article on mexico"},
        {title: "Some Article 2", desc: "Super cool article on mexico 2"},
        {title: "Some Article 3", desc: "Super cool article on mexico 3"}
    ];

    return {
        type: "FETCH_PROJECTS",
        payload: fixtures
    }
}
export function addProject(newProject) {
    // return {
    //     type: "ADD_PROJECT",
    //     payload: newProject
    // }

    const type = "ADD_PROJECT";
    let {title, desc} = newProject;

    return (dispatch) => {
        return axios.post('http://localhost:3000/api/project', {title, desc})
        .then((res) => {
            dispatch({
                type: type,
                payload: res
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