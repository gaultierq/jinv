/**
 * Created by qg on 12/06/17.
 */

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
export function addProject(title, desc) {

    const newProject = {title, desc};
    return {
        type: "ADD_PROJECT",
        payload: newProject
    }
}