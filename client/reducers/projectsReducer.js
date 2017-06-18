import { List } from 'immutable';

const init = List([]);

export default function reducer( projects = init, action) {
    switch (action.type) {
        case "FETCH_PROJECTS": {
            return List(action.payload);
        }
        case "ADD_PROJECT": {
            return projects.push(action.payload);
        }
        case "DELETE_PROJECT": {
            return projects.filter(p => p._id !== action.payload._id);
        }
        case "CREATE_TOKEN": {
            projects.set(projects.findIndex(item => item._id === action.payload._id), action.payload);
        }
    }
    return projects
}
