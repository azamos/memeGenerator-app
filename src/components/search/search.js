import React from 'react';
import './search.css';
import TextField from '@material-ui/core/TextField';
import AutoCompleteList from '../autoCompleteList/autoCompleteList';
import Suggestion from '../suggestion/suggestion';

let suggestionList = [];
let currentEvent;
export default function Search({ onChange, value, update }) {
    function onChangeCallBackList(e) {
        currentEvent = e;
        onChange(e);//Gotta happen immediatley
        fetchSuggestions(e);
    }
    function fetchSuggestions(e) {
        fetch(`http://localhost:3000/api/search/${e.target.value}`)//, { method: 'GET', signal: signal }
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
            update();
        }
    }
    return (
        <div>
            <TextField variant="filled" value={value} onChange={onChangeCallBackList} v label='Search' className="Main" />
            <AutoCompleteList list={suggestionList} />
        </div>
    );
}
