import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Search from './components/search/search';
import Suggestion from './components/suggestion/suggestion';
//import SuggestionsList from './components/suggestion/SuggestionsList';
let suggestionList = [];

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [updated, setUpdated] = useState(Date.now());
  return (
    <div className="App">
      <Search onChange={searchChanged} value={searchValue} update={updateDate} getSuggestions = {getSuggestions} />
    </div>
  );//<SuggestionsList suggestionList = {suggestionList} />
  //internal functions
  function searchChanged(e) {
    let newValue = e.target.value.toString().trim();
    // if(newValue!==''){
    //   setImmediate(fetchSuggestions,newValue);
    // }
    setImmediate(fetchSuggestions,newValue);
    setSearchValue(newValue);
  }
  function fetchSuggestions(thingToSearch){
    fetch(`http://localhost:3000/api/search/${thingToSearch}`)
      .then(res => res.json())
      .then(suggestionsFromServerArray => 
        generateViewAbleReccomendations(suggestionsFromServerArray))
        .catch(err=>console.log(err));
  }

  function generateViewAbleReccomendations(array) {
    suggestionList = [];
    for (const cell of array) {
      typeof cell === "string" ? suggestionList.push(<Suggestion sug={cell} />) :
        cell.name && typeof cell.name === "string" ? suggestionList.push(<Suggestion sug={cell.name} />)
          : console.log('cell is incompatible: ', cell);
    }
    updateDate();
  }
  function getSuggestions(){
    return suggestionList;
  }

  function updateDate() {
    setUpdated(Date.now());
  }
}
export default App;
