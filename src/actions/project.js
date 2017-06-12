/**
 * Created by qg on 12/06/17.
 */

export function fetchProjects() {
    const fixtures = [
        "Some Article",
        "Some Other Article",
        "Yet Another Article",
        "Still More",
        "Fake Article",
        "Partial Article",
        "American Article",
        "Mexican Article",
    ];

    return {
        type: "FETCH_PROJECTS",
        payload: fixtures
    }
}