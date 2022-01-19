import React from "react";
import classes from './Nav.module.css'
import {NavLink} from "react-router-dom";


const Nav = () => {
    return (
        <nav className={classes.nav}>
            <div className={`${classes.item} ${classes.active}`}>
                <NavLink to='/profile' activeClassName={classes.activeLink}>Profile</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/dialogs' activeClassName={classes.activeLink}>Messages</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/users' activeClassName={classes.activeLink}>Users</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/news' activeClassName={classes.activeLink}>News</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/music' activeClassName={classes.activeLink}>Music</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/settings' activeClassName={classes.activeLink}>Settings</NavLink>
            </div>

        </nav>
    )
}
export default Nav