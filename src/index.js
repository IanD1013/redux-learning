import configureStore from "./store/configureStore";

const store = configureStore();

store.dispatch({
    type: 'apiRequest',
    payload: {
        url: '/bugs',
        // method: 'get', // default
        // data: {}, 
        onSuccess: "bugsReceived", // name of the action that should be dispatched if this operation is successful
        onError: "apiRequestFailed" // name of the action that should be dispatched if this operation fails
    }
})