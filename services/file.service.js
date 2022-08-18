const fs = require('fs/promises')
const path = require("path");


const pathToFile = path.join(process.cwd(), 'dataBase','users.json')

const reader = async () =>{
    try{
       const data = await fs.readFile(pathToFile);
       return JSON.parse(data.toString())
    }catch (e) {
        console.log(e)
    }
}

module.exports = {
    insertUser: async (userObject) =>{
        // fs append file
    },

    getUsers: async ()=>{
        return reader();
        // const users = await reader();
        // return users ? users : [];
    }
}