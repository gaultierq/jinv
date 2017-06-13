
export default function reducer( state={
    projects: [],
    fetching: false,
    fetched: false,
    error: null
}, action) {
    // debugger; // eslint-disable-line
    switch (action.type) {
        case "FETCH_PROJECTS": {
            return { ...state, projects: action.payload, fetching: false, fetched: true};
        }
    }

    return state
}
