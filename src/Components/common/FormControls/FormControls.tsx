import React from "react";
import { WrappedFieldProps } from "redux-form";
import classes from "./FormControls.module.css"


export const FormController: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error

    return (<div className={classes.formControls + " " + (hasError ? classes.error : "")}>

        <div>
            {props.children}
        </div>
        {hasError && <span>{meta.error}</span>}

    </div>)
}


export const Textarea = (props: WrappedFieldProps) => {

    const {input, meta, ...restProps} = props

    return <FormController {...props}><textarea {...input} {...restProps}/></FormController>



}

export const Input = (props: WrappedFieldProps) => {

    const {input, meta, ...restProps} = props

    return <FormController {...props}><input {...input} {...restProps}/></FormController>
}