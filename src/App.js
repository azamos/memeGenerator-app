import React from 'react';
import { useState } from 'react';
import './App.css';
import Search from './components/search/search';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Upload from './components/upload/upload';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Choose from './components/LoginRegister/Choose';
const anonImage = "/static/images/avatars/anon.png";
const anon = "anon";

function App() {
  const [searchValue, setSearchValue] = useState('');

  const [updated, setUpdated] = useState(Date.now());

  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [memeName, setMemeName] = useState("");

  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userImage, setUserImage] = useState('');//userImage will hold chosen file value for upload.
  const changeHandlers = {
    userNameChanged,
    userPassChanged,
    userEmailChanged,
    userImageChanged,
    resetEmailAndImage,
    userLogged
  }

  const [currentUser, setCurrentUser] = useState({ name: anon, image: anonImage });//currentUser.image will hold source of user image

  return (
    <div className="App">
      <Router>
        <AppBar>
          <Toolbar className="Toolbar">

            <Link to="/generateAMeme">
              <Button variant="extendedFab">Generate a meme</Button>
            </Link>
            <Link to="/uploadImage">
              <Button variant="extendedFab">Upload an image</Button>
            </Link>
            <Link to="/topMemes">
              <Button variant="extendedFab">Top memes</Button>
            </Link>
            <Link to="/topUsers">
              <Button variant="extendedFab">Top users</Button>
            </Link>
            <Search onChange={searchChanged} value={searchValue} update={updateDate} />
            <Link to="/login or register">
              <Button variant="extendedFab">login or register</Button>
            </Link>
            <Typography variant="subtitle2">last updated: {new Date(updated).toLocaleString()}</Typography>
            <Avatar alt="anon" src={currentUser.image} className="Avatar" />
          </Toolbar>
        </AppBar>

        <Route path="/uploadImage"
          render={() =>
            <Upload description={description} fileName={fileName} memeName={memeName} cancelUpload={cancelUpload} updateDate={updateDate}
              descriptionChanged={descriptionChanged} fileChanged={fileChanged} memeNameChanged={memeNameChanged}
            />}
        />
        <Route path="/topMemes" />
        <Route path="/topUsers" />
        <Route path="/generateAMeme" />

        <Route path="/login or register" render={() =>
          <Choose userName={userName} userPass={userPass} userEmail={userEmail} userImage = {userImage} changeHandlers={changeHandlers} />
        } />

      </Router>
    </div>
  );

  function searchChanged(e) {
    let newValue = e.target.value.toString().trim();
    setSearchValue(newValue);
  }


  function updateDate() {
    setUpdated(Date.now());
  }



  function descriptionChanged(e) {
    setDescription(e.target.value);
  }
  function fileChanged(e) {
    setFileName(e.target.value);
  }
  function cancelUpload() {
    setDescription("");
    setFileName("");
    setMemeName("");
  }
  function memeNameChanged(e) {
    setMemeName(e.target.value);
  }



  function userNameChanged(e) {
    setUserName(e.target.value);
  }
  function userPassChanged(e) {
    setUserPass(e.target.value);
  }
  function userEmailChanged(e) {
    setUserEmail(e.target.value);
  }
  function userImageChanged(e){
    setUserImage(e.target.value);
  }
  function resetEmailAndImage(){
    setUserImage('');
    setUserEmail('');
  }


  function userLogged(user) {
    setCurrentUser(user);
    setUserName('');
    setUserPass('');
    setUserEmail('');
    console.log('user is :', user);
  }
}
export default App;
