import { InferActionsType } from './redux-store';
let SEND_MESSAGE = 'dialogs/SEND-MESSAGE';

type message = {id: number, text: string}
type dialogItem = {id: number, name: string}
type initialStateType = typeof initialState


let initialState = {
    MessagesData: [
        {id: 1, text: 'Hello!'},
        {id: 2, text: 'How your learning!'},
        {id: 3, text: 'Yo!'}
    ] as Array<message>,

    DialogsData: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Valera'},
        {id: 5, name: 'Misha'},
        {id: 6, name: 'Katya'}
    ] as Array<dialogItem>
};


const messageReducer = (state = initialState, action: actionsTypes):initialStateType  => {

    if (action.type === SEND_MESSAGE) {
        let newMessage = {
            id: 4,
            text: action.body
        };
        return  {...state,
            MessagesData: [...state.MessagesData, newMessage]};

    } else return state
};

export const actions = {
    addMessage: (newMessageText: string) => ({type: SEND_MESSAGE, body: newMessageText})
}
// types:
type actionsTypes = InferActionsType<typeof actions>


export default messageReducer

