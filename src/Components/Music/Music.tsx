import React from "react";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";

const Music = () => {
    return (
        <div>
            Music
        </div>
    )
}

export default withAuthRedirect(Music)