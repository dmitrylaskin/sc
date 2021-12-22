import React from "react";
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";
import reactIcon from '../../assets/images/react-js.svg'

const Header: React.FC<propsType> = (props) => {
    return (
        <header className={classes.header}>
            <img
                src={reactIcon}
                alt=""/>

                <div className={classes.loginBlock}>
                        {props.isAuth
                            ? <div>{props.login} <button className={classes.button} onClick={props.getLogoutThunkCreator}>Logout</button></div>
                            : <NavLink className={classes.loginBlock} to={'/login'}>Sign In</NavLink>}
                </div>
        </header>
    )
}

type propsType = {
    login: string
    isAuth: boolean
    getLogoutThunkCreator: () => void
}

export default Header