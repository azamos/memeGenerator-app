import React from 'react';
import { useEffect } from 'react';
import './search.css';
import TextField from '@material-ui/core/TextField';
import AutoCompleteList from '../autoCompleteList/autoCompleteList';


let suggestionList = [];
export default function Search({ onChange, value, getSuggestions, update }) {

    useEffect(() => {
        let temp = getSuggestions();
        suggestionList = temp;
        update();
    });

    return (
        <div>
            <TextField value={value} onChange={onChange} v label='Search' className="Main" />>
                <AutoCompleteList list = {suggestionList}/>
        </div>
    );
}
