export type MessagesPageType = {
    MessagesData: [{id: number, text: string}]
    DialogsData: [{id: number, name: string}]
    isAuth?: boolean
}

export type dialogsPropsType = {
    MessagesPage: MessagesPageType
    addMessage: (newMessageText: string) => void
    reset: (text: string) => void
}