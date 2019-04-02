import React from 'react';
import './upload.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
export default function Upload({ description, fileName, descriptionChanged, fileChanged }) {
    return (
        <div className="Upload">
            <Button>
                <input type="file" value={fileName} onChange={fileChanged} className={'UploadBtn'} />
            </Button>
            <br></br>
            <TextField variant="filled" label="description" className="Description"
                value={description} onChange={descriptionChanged}
            />
            <br></br>
            <Button variant="extendedFab">Upload image</Button>
        </div>
    );
}