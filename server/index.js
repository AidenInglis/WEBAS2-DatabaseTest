//Import statements
import express from 'express';//imports the express framework - this will help me create the server
import "express-async-errors";//imports the express-async-errors package - this will help me handle errors better
import posts from ".routes/posts.js";//imports the posts route
import ".loadEnv.js";//imports the .loadEnv.js file - this will load the environment variables

//Server Setup
const PORT = process.env.PORT || 3000;//Sets the port value to 3000 for setting up the server.
const app = express();//Makes instance of the express framework.

//Middleware Setup.
app.use(express.json());//This will help me parse request bodies in the JSON format.

//Route Handling
app.use("/posts", posts);//This will handle requests to /posts.

//Error Handling Middleware Setup.
app.use((err, req, res, next) => {
    res.status(500).send("An unexpected error occured.");//This sends a error message to the user.
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);//This will log a message to the console when the server is running on the chosen port.
});