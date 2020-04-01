import React from "react";
import {Field, reduxForm} from "redux-form";
import {required} from "../../utilites/validators/validators";
import {Input} from "../common/FormControls/FormControls";
import {getLoginThunkCreator} from "../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import classes from "./../common/FormControls/FormControls.module.css"

const LoginForm = (props) => {

//все наши данные упаковываются в obj formData
    //внутри handleSubmit вызывается onSubmit() и в него передается formData
    return <div>

        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={'email'} placeholder={'email'} validate={[required]}/>
            </div>
            <div>
                <Field component={Input} name={'password'} placeholder={'password'} validate={[required]} type={'password'}/>
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type={'checkbox'}/> remember me
            </div>
            {/*Общий error появился путем добавления _error в stopSubmit()*/}
            {props.error && <div className={classes.formSummaryError}>
                {props.error}

            </div>}
            <div>
                <button>Sign in</button>
            </div>

        </form>
    </div>
};


const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)



const Login = (props) => {


    const onSubmit = (formData) => {
        props.getLoginThunkCreator(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    //этот onSubmit вызывается внутри handleSubmit в LoginForm
    return <LoginReduxForm onSubmit={onSubmit}/>
};

export default Login;