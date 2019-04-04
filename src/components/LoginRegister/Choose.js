import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LoginRegister from './LoginRegister';
import './Choose.css';

export default function Choose({userName,userPass,userEmail,userImage,changeHandlers}) {
    return (
        <div className = "Choose">
            <Router>
                <Link to="/signIn">
                    <Button variant="extendedFab">Sign In</Button>
                </Link>
                <Link to="/register">
                    <Button variant="extendedFab">Register</Button>
                </Link>

                <Route path="/signIn"
                    render={() =>
                        <LoginRegister changeHandlers={changeHandlers} type="signIn"
                            name={userName} password={userPass} userEmail={userEmail} userImage = {userImage} />
                    }
                />

                <Route path="/register"
                    render={() =>
                        <LoginRegister changeHandlers={changeHandlers} type="register"
                            name={userName} password={userPass} userEmail={userEmail} userImage = {userImage}/>
                    }
                />

            </Router>
        </div>
    );
}