import React from 'react';
import {useEffect} from 'react';
import './search.css';
let suggestionList = [];
export default function Search({ onChange, value, getSuggestions, update }) {
    // function fillList(){
    //     suggestionList = getSuggestions();
    //     update();
    // }

    useEffect( () => {
        let temp = getSuggestions();
        if(temp.length !==0 && suggestionList.length!==temp.length){
            suggestionList = temp;
            console.log(suggestionList);
            update();
        }
    });

    return (
        <div>
            <input value={value} onChange={onChange} className={'Main'} />
            {
                suggestionList.length > 0 ?
                    suggestionList
                    :
                    <span></span>
            }
        </div>
    );
}
