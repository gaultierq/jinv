
export default function reducer( state={
    projects: [],
    fetching: false,
    fetched: false,
    error: null
}, action) {
    debugger;
    switch (action.type) {
        case "FETCH_PROJECTS": {
            return { ...state, projects: action.payload, fetching: false, fetched: true};
        }
        case "ADD_PROJECT": {
            return { ...state, projects: [...state.projects, action.payload]};
        }
    }
    return state
}
