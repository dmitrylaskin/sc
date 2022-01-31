import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../utilites/validators/validators";
import {Input} from "../common/FormControls/FormControls";
import {Redirect} from "react-router-dom";
import classes from "./../common/FormControls/FormControls.module.css"

const LoginForm: React.FC<InjectedFormProps<formDataType, ownPropTypes> & ownPropTypes> = (props) => {
//все наши данные упаковываются в obj formData
// внутри handleSubmit вызывается onSubmit() и в него передается formData
    return <div className={classes.loginForm}>

        <form className={classes.formInputs} onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={'email'} placeholder={'email'} validate={[required]}/>
            </div>
            <div>
                <Field component={Input} name={'password'} placeholder={'password'} validate={[required]} type={'password'}/>
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type={'checkbox'}/> remember me
            </div>
            
            {props.captchaUrl && <img src={props.captchaUrl}/>}
            {props.captchaUrl && <Field component={Input} name={'captcha'} placeholder={''} validate={[required]}/>}

            {/*Общий error появился путем добавления _error в stopSubmit()*/}
            {props.error && <div className={classes.formSummaryError}>
                {props.error}

            </div>}
            <div>
                <button className={classes.submitButton}>Sign in</button>
            </div>

        </form>
    </div>
};

const LoginReduxForm = reduxForm<formDataType, ownPropTypes>({form: 'login'})(LoginForm)

const Login: React.FC<loginPropTypes> = (props) => {

    const onSubmit = (formData: formDataType) => {
        props.getLoginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    //этот onSubmit вызывается внутри handleSubmit в LoginForm
    return <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
};

export default Login;

// types:
type ownPropTypes = {
    captchaUrl: string | null
}

type loginPropTypes = {
    getLoginThunkCreator: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    isAuth: boolean
    captchaUrl: string | null
}
type formDataType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}