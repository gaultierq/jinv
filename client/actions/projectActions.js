import axios from 'axios';
import getWeb3 from '../utils/getWeb3'

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
        axios
            .delete('http://localhost:3000/api/project', {params: {_id}})
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


export function deployToken(token, _id) {
    let type = "DEPLOY_TOKEN";
    return (dispatch) => {
        if (token.address) {
            console.error(`token already has an address`);
            return;
        }
        getWeb3
            .then(results => {
                let { web3 } = results;
                let {abi, binary} = token.contract;
                let c = web3.eth.contract(abi);
                const contractInstance = c.new({
                    data: '0x' + binary,
                    from: web3.eth.coinbase,
                    gas: 90000*2
                }, (err, res) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    // Log the tx, you can explore status with eth.getTransaction()
                    console.log(res.transactionHash);
                    dispatch({
                            type: type,
                            payload: {
                                projectId: _id,
                                transactionHash: res.transactionHash
                            }
                        }
                    );

                    // If we have an address property, the contract was deployed
                    if (res.address) {
                        console.log('Contract address: ' + res.address);
                        // Let's test the deployed contract
                        dispatch({
                            type: type,
                            payload: {
                                projectId: _id,
                                transactionHash: res.transactionHash,
                                address: res.address
                            }
                        });
                    }
                });
            });
    }

}