const Urls ={
    users: 'http://localhost:3000/api/users',
    memes: 'http://localhost:3000/api/memes'
}
function find(what,where){
    try{
        if(!(Object.keys(Urls).includes(where))){
            throw new Error('Where does not exist');
        }
        return fetch(`${Urls[where]}/${what}`)
        .then(res=>res.json())//if throws error, will be catched by catch block
    }
    catch(err){
        console.log(err);
    }
}

function insert(){
    console.log('not imp yet');
    return 'not imp yet';
}

const db = {
    find,
    insert
}

export default db;