import React from 'react';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import './LoginRegister.css';
import db from '../../services/dbServices';

export default function LoginRegister({ name, password, userEmail, userImage , changeHandlers, type }) {
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
        db.insertUser(name,password,userEmail,e.target.files[0]);
    }

    return (
        <div className="LoginRegister">
            <TextField id="name" value={name} onChange={changeHandlers.userNameChanged} label="name" />
            <Divider />
            <TextField id="password" value={password} onChange={changeHandlers.userPassChanged} label="password" />
            <Divider />
            {
                type === "register" ? <Email email = {userEmail} emailChanged = {changeHandlers.userEmailChanged}
                  image = {userImage} imageChanged = {changeHandlers.userImageChanged} /> : <span></span>
            }
            <Button onClick={type === "register" ? register : signIn} variant="extendedFab" className="Finish">Finish</Button>
        </div>
    );
    function Email({ email, emailChanged , image, imageChanged}) {
        return (
            <div>
                <TextField id="email" value={email} onChange={emailChanged} label="email" />
                <Divider />
                <input  type="file" value={image} onChange={imageChanged} label="image" id="image" />
                <Divider />
            </div>
        );
    }
}