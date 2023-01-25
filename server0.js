//import express from "express"; => Throws error
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

// Connect to the Mongo database
mongoose.connect("mongodb://localhost:27017/keeper-notes");
// Create the schema for the future model
const noteSchema = new mongoose.Schema({
    title: String,
    content: String
});
// Create the model
const Note = new mongoose.model("Note", noteSchema);

const app = express();
app.use(bodyParser.json()); // To parse the info sent from the AXIOS call made from the React App
app.use(bodyParser.urlencoded({extended:true}));

// READ
app.get("/api/notes", (req,res)=>{
    //res.sendFile(__dirname + "/serverHtml.html");
    Note.find((err, notes)=>{
        if (!err) {
            console.log(`There are ${notes.length} notes in the keeper-notes mongo database\n`);
            res.send(notes);
        } else {
            console.log(err);
            res.send(err);
        }
    })
})

// CREATE
app.post("/api/notes", (req,res)=>{
    //console.log(`req.body = ${JSON.stringify(req.body)}`);
    const {title,content} = req.body;
    // Create a new instance of the Note model and save it:
    const newNote = new Note({title:title, content:content});
    newNote.save();
    console.log(`Note Added to MongoDB: ${JSON.stringify(newNote)}\n`);
    res.send();
})

// DELETE
app.delete("/api/notes/:del_id", (req,res)=>{

    const del_id = req.params.del_id;
    console.log(`del_id: ${del_id}`);

    Note.deleteOne({_id:del_id},(err)=>{
        if (!err) {
            console.log("Note successfully deleted or No Error\n")
        } else console.log(err)
    });

    res.send();
})

app.listen(5500, ()=>{
    console.log("\nServer running on port 5500\n");
})