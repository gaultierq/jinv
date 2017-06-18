/**
 * Created by qg on 12/06/17.
 */
import { combineReducers } from "redux"

import projects from "./projectsReducer"

export default combineReducers({
    projects: projects
})
