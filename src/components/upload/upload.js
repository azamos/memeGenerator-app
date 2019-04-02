import React from 'react';
import './upload.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
export default function Upload({description,fileName,descriptionChanged,fileChanged}){
    return(
        <div className = "Upload">
            <TextField type = "file" value = {fileName} onChange = {fileChanged}/>
            <TextField variant = "filled" label = "description" value = {description} onChange = {descriptionChanged}/>
            <Button variant = "extendedFab">Upload image</Button>
        </div>
    );
}