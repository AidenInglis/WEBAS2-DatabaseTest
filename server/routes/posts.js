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

//Fetch a single post
router.get('/:id', async (req, res) => {//Get request to fetch a single post.
    let collection = await db.collection('posts');//getting the posts collection from mongodb.
    let query = {_id: ObjectId(req.params.id)}//query sets the id of post to request id.
    let results = await collection.findOne(query);//finds the post with id in the database.

    if (!results) res.send("Post not found").status(404)
        else res.send(result).status(200);
});

//Add a new post
router.post('/', async (req, res) => {//Post request that adds a new note.
    let collection = await db.collection('posts');//getting the posts collection from mongodb.
    let newDocument = req.body;
    let result = await collection.insertOne(newDocument);//inserts the new Doc into the collection.

    res.send(results).status(204);
});

//Update existing Note with new content.
router.put('/post/:id', async (req, res) => {//Put request to update an existing note.
    const query = {_id: ObjectId(req.params.id)}//query set id to request id.
    const updates = {
        $push: {content: req.body}
    }
    let collection = await db.collection('posts');//getting the posts collection from mongodb.
    let results = await collection.updateOne(query, updates);//updates the post with new content.

    res.send(result).status(200);//sends the status of the post we updated.
});

//Delete a Note from the database.
router.delete('/post/:id', async (req, res) => {
    const query = {_id: ObjectId(req.params.id)}//query set id to request id so we know what to delete.

    const collection = db.collection('posts');//getting the Notes collection from mongodb.
    let result = await collection.deleteOne(query);//this will delete the note with the id in the query.

    res.send(result).status(200);//sends the status of the deleted Note.
})

export default router;//Exporting the router.