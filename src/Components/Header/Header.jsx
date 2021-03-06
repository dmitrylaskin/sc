import React from "react";
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";


const Header = (props) => {
    return (
        <header className={classes.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png"
                alt=""/>

                <div className={classes.loginBlock}>
                    <div>
                        {/*<img src={props.isAuth ? logAvatar : null} alt=""/>*/}

                        {props.isAuth
                            ? <div>{props.login} <button className={classes.button} onClick={props.getLogoutThunkCreator}>Logout</button></div>
                            : <NavLink className={classes.loginBlock} to={'/login'}>Sign In</NavLink>}
                    </div>
                </div>
        </header>
    )
}
export default Header