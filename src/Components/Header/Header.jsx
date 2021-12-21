import React from "react";
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";
import reactIcon from '../../assets/images/react-js.svg'


const Header = (props) => {
    return (
        <header className={classes.header}>
            <img
                src={reactIcon}
                alt=""/>

                <div className={classes.loginBlock}>
                        {/*<img src={props.isAuth ? logAvatar : null} alt=""/>*/}

                        {props.isAuth
                            ? <div>{props.login} <button className={classes.button} onClick={props.getLogoutThunkCreator}>Logout</button></div>
                            : <NavLink className={classes.loginBlock} to={'/login'}>Sign In</NavLink>}
                </div>
        </header>
    )
}
export default Header