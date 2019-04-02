import React from 'react';
import { useState } from 'react';
import './App.css';
import Search from './components/search/search';
import Suggestion from './components/suggestion/suggestion';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Upload from './components/upload/upload';

let suggestionList = [/*<Suggestion sug="example1" />, <Suggestion sug="example2" />, <Suggestion sug="example3" />, <Suggestion sug="example4" />*/];
//let contoller = new AbortController();
//let signal = contoller.signal;
let currentEvent = null;

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [updated, setUpdated] = useState(Date.now());
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  return (
    <div className="App">
      <AppBar>
        <Toolbar className="Toolbar">
          <Router>
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
            <Route path="/uploadImage"
              render={() =>
                <Upload description={description} fileName={fileName}
                  descriptionChanged={descriptionChanged} fileChanged={fileChanged}
                />}
            />
            <Route path="/topMemes" />
            <Route path="/topUsers" />
            <Route path="/generateAMeme" />

            <Search onChange={searchChanged} value={searchValue} update={updateDate} getSuggestions={getSuggestions} />

            <Link to="/login or register">
              <Button variant="extendedFab">login or register</Button>
            </Link>
            <Route path="/login or register" />

          </Router>
        </Toolbar>
      </AppBar>
    </div>
  );
  //internal functions
  function searchChanged(e) {
    currentEvent = e;
    //contoller.abort();
    let newValue = e.target.value.toString().trim();
    setImmediate(fetchSuggestions, newValue, e);
    setSearchValue(newValue);
  }
  function fetchSuggestions(thingToSearch, e) {
    fetch(`http://localhost:3000/api/search/${thingToSearch}`)//, { method: 'GET', signal: signal }
      .then(res => res.json())
      .then(suggestionsFromServerArray =>
        generateViewAbleReccomendations(suggestionsFromServerArray, e))
      .catch(err => console.log(err));
  }

  function generateViewAbleReccomendations(array, e) {
    suggestionList = [];
    //contoller.abort();
    if (e === currentEvent) {
      currentEvent = null;//neccesarry?
      for (const cell of array) {
        typeof cell === "string" ? suggestionList.push(<Suggestion sug={cell} />) :
          cell.name && typeof cell.name === "string" ? suggestionList.push(<Suggestion sug={cell.name} />)
            : console.log('cell is incompatible: ', cell);
      }
      updateDate();
    }
  }
  function getSuggestions() {
    return suggestionList;
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
}
export default App;
