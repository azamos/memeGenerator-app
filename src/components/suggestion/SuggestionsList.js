import React from 'react';

export default function SuggestionsList({suggestionList}){
    return(
        <ul>
            {suggestionList.length?suggestionList:<span></span>}
        </ul>
    );
}