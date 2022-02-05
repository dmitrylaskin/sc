import {getAuthUserDataThunkCreator} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {appStateType, InferActionsType} from "./redux-store";

const INITIALIZED_SUCCESSFUL= 'app/INITIALIZED-SUCCESSFUL';


let initialState = {
    initialized: false
};
type initialStateType = typeof initialState

let appReducer = (state = initialState, action: actionsTypes): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESSFUL:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;

    }
};

const actions = {
    initializedSuccessful : () => ({type: INITIALIZED_SUCCESSFUL})
}
// types:
type actionsTypes = InferActionsType<typeof actions>


//THUNKS:
type thunksType = ThunkAction<Promise<void>, appStateType, unknown, actionsTypes>

export const initializeAppThunkCreator = () => (dispatch: any) => {
        //dispatch может возвращать то, что возвращает ф-я,
        //которую он вызывает
        let dispatchResult = dispatch(getAuthUserDataThunkCreator());

        Promise.all([dispatchResult])
            .then(() => {

            dispatch(actions.initializedSuccessful())
        })

    }

export default appReducer