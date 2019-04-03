import React from 'react';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import './LoginRegister.css';
import db from '../../services/dbServices';

export default function LoginRegister({ name, password, email, changeHandlers, type }) {
    function signIn() {
        db.find(name, 'users', password)
            .then(result => {
                if (result instanceof Array) {
                    return changeHandlers.userLogged(result.pop())
                }
                console.log(result);//TODO: present a styled alert or equivilant.
            })
            .catch(err => console.log(err));
    }
    function register() {
        console.log('registerd');
    }

    return (
        <div className="LoginRegister">
            <TextField id="name" value={name} onChange={changeHandlers.userNameChanged} label="name" />
            <Divider />
            <TextField id="password" value={password} onChange={changeHandlers.userPassChanged} label="password" />
            <Divider />
            {
                type === "register" ? Email(email, changeHandlers.userEmailChanged) : <span></span>
            }
            <Button onClick={type === "register" ? register : signIn} variant="extendedFab" className="Finish">Finish</Button>
        </div>
    );
    function Email({ email, emailChanged }) {
        return (
            <div>
                <TextField id="password" value={email} onChange={emailChanged} label="email" />
                <Divider />
            </div>
        );
    }
}