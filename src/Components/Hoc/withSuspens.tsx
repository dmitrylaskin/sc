import React from "react";

export function withSuspens<ComponentPropsType>(Component: React.ComponentType<ComponentPropsType>) {
    return (props: ComponentPropsType) => {
        return (<React.Suspense fallback={<div>Loading...</div>}>
            <Component {...props}/>
        </React.Suspense>)
    }
}