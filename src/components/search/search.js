import React from 'react';
import { useEffect } from 'react';
import './search.css';
import TextField from '@material-ui/core/TextField';
import AutoCompleteList from '../autoCompleteList/autoCompleteList';


let suggestionList = [];
export default function Search({ onChange, value, getSuggestions, update }) {

    useEffect(() => {
        console.log('here');
        let temp = getSuggestions();
        suggestionList = temp;
    });

    return (
        <div>
            <TextField variant = "filled" value={value} onChange={onChange} v label='Search' className="Main" />
            <AutoCompleteList list={suggestionList} />
        </div>
    );
}
