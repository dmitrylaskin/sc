import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./user-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";


let rootReducer = combineReducers({
    //методы этого объекта это свойства state
    ProfilePage: profileReducer,
    MessagesPage: messageReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type rootReducerType = typeof rootReducer
export type appStateType = ReturnType<rootReducerType>

// T - объект экшенов, U - ф-я, которую возвращает метод
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
// Выделение типов экшенов
export type InferActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>

// chrome extensions:
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

//const store = createStore(benchOfReducers, applyMiddleware(thunkMiddleware));

export default store
