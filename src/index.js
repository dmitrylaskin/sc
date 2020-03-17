import React from "react";
import "./index.css";
import ReactDOM from "react-dom"
import App from './App';
import * as serviceWorker from './serviceWorker';
import state, {subscribe} from "./Components/Redux/store";
import {BrowserRouter} from "react-router-dom";
import {addPost} from "./Components/Redux/store";
import store from "./Components/Redux/redux-store";
import './index.css';
import {updateNewPostText} from "./Components/Redux/store";
// import {Provider} from "./StoreContext";
import {Provider} from "react-redux";


ReactDOM.render(
    <BrowserRouter>
        {/*<App state={state} dispatch={store.dispatch.bind(store)} store={store}/>*/}
        {/*<StoreContext.Provider value={store}>*/}
        {/*    <App/>*/}
        {/*</StoreContext.Provider>*/}
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>, document.getElementById('root'));


// store.subscribe(renderEntireTree);



// store.subscribe(() => {
//     let state = store.getState();
//     renderEntireTree(state)
// });
// renderEntireTree(state.getState());



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


