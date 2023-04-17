//index.js is the entry point 
//first we need to make server for this  I am using express
//So we have to install express to run the server of express
//import ka use karne ke liye pehle package.json mai jaakar script se pehle "type":"module" likhna hai jabhi new es6 ke features kaam karenge.
//so for intallation we requre package.json as it is required for further installation of module which is going to required during the whole project.
//first step is to write a coomand npm init to initialize the empty package.json file.
//Now install npm i express
//nodemon ko install karna hai --> npm i --save-dev nodemon --> yeh dev ke samay he sirf kaam karega production ke samay matla b deploy ke samay hume wasie bhi backend par kuch karna nehi rehta hai tho us tym par kuch nodemon ki jarurat he nehi hai esliye dev mai install karenge.

//cluster --> mai blog-app likha hai yeh basically database hai cluster yaani database.
 
import express from 'express';
import dotenv from 'dotenv';

import cors from "cors";
import bodyParser from 'body-parser';

import Connection from './database/db.js'; //yaha par extension likhna compulsory hai yeh likhna padega.

import Router from './routes/route.js';




dotenv.config();

const app =express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',Router);


const port = 8000;

app.listen(port,() => console.log(`server is running successfully on Port  ${port}`) );

const USERNAME =process.env.DB_USERNAME;
const PASSWORD =process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);

