import React from 'react';
import Proptypes from 'prop-types';
import './suggestion.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
export default function Suggestion({ sug }) {
    return (
        <ListItem>
            <ListItemText >{sug}</ListItemText>
        </ListItem>
    );
}
Suggestion.propTypes = {
    text: Proptypes.string.isRequired
}