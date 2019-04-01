import React from 'react';
import Proptypes from 'prop-types';
export default function Suggestion({sug}){
    return (
        <li>{sug}</li>
    );
}
Suggestion.propTypes = {
    text : Proptypes.string.isRequired
}