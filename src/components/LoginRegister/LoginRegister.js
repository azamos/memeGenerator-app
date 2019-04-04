import React from 'react';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import './LoginRegister.css';
import db from '../../services/dbServices';

export default function LoginRegister({ name, password, userEmail, userImage, changeHandlers, type }) {
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
    function register(e) {
        db.insertUser(name, password, userEmail, e.target.files[0]);
    }

    return (
        <div className="LoginRegister">
            <TextField id="name" value={name} onChange={changeHandlers.userNameChanged} label="name" />
            <Divider />
            <TextField id="password" value={password} onChange={changeHandlers.userPassChanged} label="password" />
            <Divider />
            {
                type === "signIn" ? <span></span>
                    :
                    <div>
                        <TextField id="email" value={userEmail} onChange={changeHandlers.userEmailChanged} label="email" />
                        <Divider />
                        <TextField id="image" type="file" value={userImage} onChange={changeHandlers.userImageChanged} label="image" />
                        <Divider />
                    </div>
            }
            <Button onClick={type === "register" ? register : signIn} variant="extendedFab" className="Finish">Finish</Button>
        </div>
    );
}