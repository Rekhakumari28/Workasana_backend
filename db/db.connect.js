const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGODB


const initialiseDatabase = async () => {
    try {
        const connection = await mongoose.connect(mongoURI)
        if(connection) {
            console.log("Connected Successfully.")
        }
    } catch (error) {
        console.log("Connection failed.")
        console.log(error)
    }
}

module.exports = {initialiseDatabase}