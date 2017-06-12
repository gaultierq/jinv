/**
 * Created by qg on 12/06/17.
 */
export default function reducer( state={
    project: {
        id: null,
        title: null,
        desc: null,
    },
    fetching: false,
    fetched: false,
    error: null
}, action) {

    switch (action.type) {
        case "FETCH_PROJECTS": {
            return { ...state, fetching: true};
        }
    }

    return state
}
