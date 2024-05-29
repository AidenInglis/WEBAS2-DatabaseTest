//Import MongoClient from mongodb - Class
import {MongoClient} from 'mongodb';

//Connection Setup
const connectionString = process.env.ATLAS_URI || "";//Sets the connection string to the value of the MONGODB_URI env var.

//Creating MongoCLient
const client = new MongoClient(connectionString)//Creating a new instance of MongoClient class. used to connect to mongodb server.

//Connect to the database - MongoDB

let connection;

try {
    connection = await client.connect();//Connects to the MongoDB server and is asynchronous.
} catch (e) {
    console.error(e);//Logs each error to the console.
}

//Get the Database Reference - MondoDB
let db = connection.db('sample_db')

//Export the database
export default db;