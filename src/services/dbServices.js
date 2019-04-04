const Urls = {
    users: 'http://localhost:3000/api/users',
    memes: 'http://localhost:3000/api/memes'
}
function find(what, where, ...aditionalArgs) {
    try {
        if (!(Object.keys(Urls).includes(where))) {
            throw new Error('Where does not exist');
        }
        return fetch(`${Urls[where]}/${what}&${aditionalArgs}`)
            .then(res => res.json())//if throws error, will be catched by catch block
            .catch(err=>console.log(err));//todo: show the error to the user NOT in the console
    }
    catch (err) {
        console.log(err);//todo: show the error to the user NOT in the console
    }
}

function insertUser(name, password, email, image) {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('image', image);
    return fetch(Urls.users, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())//if throws error, will be catched by catch block
        .catch(err=>console.log(err));//todo: show the error to the user NOT in the console
}

const db = {
    find,
    insertUser
}

export default db;