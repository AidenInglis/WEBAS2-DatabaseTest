//Import Statements.

import express from 'express';//Importing express module.
import db from '../db/connection.js';//Importing the database connection from connection.js.
import {ObjectId} from 'mongodb';//Importing ObjectId from mongodb.

const router = express.Router();//Creating a new router method.

//Routes Definitions.
router.get('/', async (req, res) => {
    let collection = await db.collection('posts');
    let results = await collection.find({})
        .limit(100)
        .toArray();

    res.send(results).status(200);
});

//Fetch the latest posts
router.get('/latest', async (req, res) => {//Get request to fetch the latest posts.
    let collection = await db.collection("posts")
    let results = await collection.aggregate([//Aggregating posts from the database.
        {"$note": {"name": 1, "date": 1, "content": 1}},
        {"$sort": {"date": -1}},//Sorting the posts by date in descending order.
    ]).toArray();
    res.send(results).status(200);
});