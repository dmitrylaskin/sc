import React, { ReactNode } from "react";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";

type propsType = {
    isAuth: boolean
}

const News: React.FC<propsType> = (props) => {
    if (!props.isAuth) {return null}
    return (
        <div>
            News
        </div>

    )
}

export default withAuthRedirect(News)