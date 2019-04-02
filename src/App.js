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

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [updated, setUpdated] = useState(Date.now());
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
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
          </Toolbar>
        </AppBar>

        <Route path="/uploadImage"
          render={() =>
            <Upload description={description} fileName={fileName} cancelUpload = {cancelUpload}
              descriptionChanged={descriptionChanged} fileChanged={fileChanged}
            />}
        />
        <Route path="/topMemes" />
        <Route path="/topUsers" />
        <Route path="/generateAMeme" />
        <Route path="/login or register" />

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
  function cancelUpload(){
    setDescription("");
    setFileName("");
  }
}
export default App;
