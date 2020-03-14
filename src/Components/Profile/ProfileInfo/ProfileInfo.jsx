import React from "react";
import classes from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div className={classes.item}>
            <img
                src="https://s.yimg.com/uu/api/res/1.2/DdytqdFTgtQuxVrHLDdmjQ--~B/aD03MTY7dz0xMDgwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2019-11/7b5b5330-112b-11ea-a77f-7c019be7ecae"
                alt=""/>

            <div className={classes.description}>
            ava + desc
            </div>
        </div>
    )
}
export default ProfileInfo