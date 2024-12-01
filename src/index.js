import configureStore from "./store/configureStore";

const store = configureStore();

store.dispatch((dispatch, getState) => {
    dispatch({ type: 'bugsReceived', bugs: [1, 2, 3] });
    console.log(getState());
})