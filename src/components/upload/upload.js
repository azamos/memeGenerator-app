import React from 'react';
import './upload.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
let file;

export default function Upload({ description, fileName, descriptionChanged, fileChanged, cancelUpload, memeName ,memeNameChanged }) {
    let formData = new FormData();
    function fileChangedCallbacks(e) {
        fileChanged(e);
        file = e.target.files[0];
    }
    function postMeme() {
        if (!file) { return; }//TODO: add serverside validation
        formData.append('name',memeName);
        formData.append('description', description);
        formData.append('image', file);
        fetch('http://localhost:3000/api/memes', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => cleanupAndDoSomething(result))
            .catch(err => console.error(err));
    }
    function cleanupAndDoSomething(whatever) {
        console.log(whatever);
        cancelUpload();
    }
    return (
        <div className="Upload">
            <Button>
                <input type="file" value={fileName} onChange={fileChangedCallbacks} className={'UploadBtn'} />
            </Button>
            <br></br>
            {
                fileName ?
                    <Button variant="extendedFab" onClick={cancelUpload}>Cancel</Button>
                    :
                    <span></span>
            }
            <br></br>
            <TextField variant="filled" label="description" className="Description"
                value={description} onChange={descriptionChanged}
            />
            <br></br>
            <TextField variant="filled" label="meme name" className="Description"
                value={memeName} onChange={memeNameChanged}
            />
            <br></br>
            <Button variant="extendedFab" onClick={postMeme}>Upload image</Button>
        </div>
    );
}