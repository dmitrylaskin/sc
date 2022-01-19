import React, {ChangeEvent} from "react";
import classes from './ProfileStatus.module.css'

type PropsType = {
    status: string
    updateUserStatusThunkCreator: (status: string) => void
}
type StateType = {

}

// переделано на хуки!!!
class ProfileStatus extends React.Component<PropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode() {
        //метод setState перезаписывает свойства объекта из state
        this.setState({
            editMode: true
        })
    }
    deActivateEditMode() {
        //метод setState перезаписывает свойства объекта из state
        this.setState({
            editMode: false
        });
        this.props.updateUserStatusThunkCreator(this.state.status)
    }
    onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: event.currentTarget.value
        })
    }
// за счет вызова метода componentDidUpdate сетаем status из пришедших пропсов в local state сразу!
// таким образом local state всегда соответствует state пришедшвему из пропсов
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {

        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {

        return (
            <div>

                {!this.state.editMode &&
                <div>
                    <span className={classes.status} onDoubleClick={this.activateEditMode.bind(this)}>
                        {this.props.status || 'ERROR :('}
                    </span>
                </div>}

                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode.bind(this)} value={this.state.status}/>
                </div>}

            </div>
        )
    }
}

export default ProfileStatus