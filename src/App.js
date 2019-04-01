import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Search from './components/search/search';
import Suggestion from './components/suggestion/suggestion';

let suggestionList = [];
//let contoller = new AbortController();
//let signal = contoller.signal;
let currentEvent = null;

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [updated, setUpdated] = useState(Date.now());
  return (
    <div className="App">
      <Search onChange={searchChanged} value={searchValue} update={updateDate} getSuggestions={getSuggestions} />
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
}
export default App;
