import dotProp from "dot-prop-immutable";


export default function reducer( projects = [], action) {
    switch (action.type) {
        case "FETCH_PROJECTS": {
            return action.payload;
        }
        case "ADD_PROJECT": {
            return [...projects, action.payload];
        }
        case "DELETE_PROJECT": {
            return projects.filter(p => p._id !== action.payload._id);
        }
        case "CREATE_TOKEN": {
            return projects.map((p) => {
                if (p._id === action.payload._id) {
                    p = dotProp.set(p, `token`, action.payload);
                }
                return p;
            });
        }
        case "DEPLOY_TOKEN": {
            return projects.map((p) => {
                if (p._id === action.payload.projectId) {
                    p = dotProp.set(p, `token.contract.address`, action.payload.address);
                    p = dotProp.set(p, `token.contract.creationTxHash`, action.payload.transactionHash);

                }
                return p;
            });
        }
    }
    return projects
}


// case "FETCH_PROJECTS": {
//     return { ...state, projects: action.payload, fetching: false, fetched: true};
// }
// case "ADD_PROJECT": {
//     return { ...state, projects: [...state.projects, action.payload]};
// }
// case "DELETE_PROJECT": {
//     return { ...state, projects: state.projects.filter(p => p._id !== action.payload._id)};
// }