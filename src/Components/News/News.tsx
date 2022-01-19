import React from "react";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";

type propsType = {
    isAuth: boolean
}

const News: React.FC<propsType> = (props): any => {
    if (!props.isAuth) {return }
    return (
        <div>
            News
        </div>

    )
}

export default withAuthRedirect(News)