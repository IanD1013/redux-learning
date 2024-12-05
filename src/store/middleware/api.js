import axios from 'axios';

// Our api middleware shoule be able to handle this kind of action: 
const action = {
    type: 'apiRequest',
    payload: {
        url: '/bugs',
        method: 'get',
        data: {},
        onSuccess: "bugsReceived", // name of the action that should be dispatched if this operation is successful
        onError: "apiRequestFailed" // name of the action that should be dispatched if this operation fails
    }
}

const api = ({ dispatch }) => next => async action => {
    if (action.type !== 'apiRequest') return next(action);

    next(action);
    const { url, method, data, onSuccess, onError } = action.payload;

    try {   
        const response = await axios.request({baseURL:"http://localhost:9001/api", url, method, data})
        dispatch({ type: onSuccess, payload: response.data })
    } catch (error) {
        dispatch({ type: onError, payload: error })
    }
}

export default api;  