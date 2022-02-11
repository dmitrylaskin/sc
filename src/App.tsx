import React from 'react';
import './App.css';
import Nav from "./Components/Nav/Nav";
import ProfileContainer from "./Components/Profile/ProfieContainer";
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import UsersContainer from "./Components/Users/UsersContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import LoginContainer from "./Components/Login/LoginContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeAppThunkCreator} from "./Components/Redux/app-reducer";
import preloader from "./assets/images/spinning-circles.svg";
import pic404 from "./assets/images/page-not-found.png";
import { appStateType } from './Components/Redux/redux-store';

const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));

type mapStatePropsType = {
    initialized: boolean
}
type mapDispatchPropsType = {
    initializeAppThunkCreator: () => void
}
type ownPropsType = {}
type appType = mapStatePropsType & mapDispatchPropsType & ownPropsType

class App extends React.Component<appType> {
    catchAllUnhandledErrors(promise: PromiseRejectionEvent) {
        alert('Something went wrong')
        console.error(promise)
    }


    componentDidMount() {
        this.props.initializeAppThunkCreator()
        //перехват всех ошибок
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {

        if (!this.props.initialized) {
            return <img className='preloader' src={preloader} />
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>

                <div className='app-wrapper-content'>
                    {/*switch осуществляет сравнение сверху-вниз к более точному совпадению*/}
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={'/profile'} /> }/>
                        {/* :userId? - params для withRouter */}
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>

                        <Route path='/dialogs' render={() =>
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <DialogsContainer />
                            </React.Suspense>}/>

                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/users' render={() => <UsersContainer />}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/login' render={() => <LoginContainer/>}/>
                        <Route path='*' render={() => <div><b>NOT FOUND</b><br/><img src={pic404}/></div> }/>

                    </Switch>

                </div>

                <Nav/>
            </div>

        );
    }
}
const mapStateToProps = (state: appStateType) => {
    return {
        initialized: state.app.initialized
    }
}

let Composed = compose(
    withRouter,
    connect(mapStateToProps, {initializeAppThunkCreator,})
)(App);

export default Composed
