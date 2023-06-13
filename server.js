const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const { readNotesMongo, createNoteMongo, deleteNoteMongo } = require("./mongo");
const { readNotesDynamo, createNoteDynamo, deleteNoteDynamo } = require("./dynamo");


const app = express();
app.use(bodyParser.json()); // To parse the info sent from the AXIOS call made from the React App
app.use(bodyParser.urlencoded({extended:true}));

// HOME
// app.get('/api', (req, res) => {
//   res.json(
//     {message: "Go to http://localhost:3000/mongo"}
//   )
// })

// MONGO ///////////////////////////////////////
app.get("/api/mongo", (req,res)=>{
    try {
        readNotesMongo(res);
    } catch (error) {
        console.log(error);
    };
})

app.post("/api/mongo", (req,res)=>{
    try {
        console.log("\nAdding note...\n");
        createNoteMongo(req.body);
    } catch (error) {
        console.log(error);
    };
    res.send();
})

app.delete("/api/mongo/:id", (req,res)=>{
    try {
      console.log("\nDeleting note...\n");
      deleteNoteMongo(req.params.id);
    } catch (error) {
      console.log(error);
    }
    res.send();
})
////////////////////////////////////////////////

// DYNAMO //////////////////////////////////////
app.get("/api/dynamo", async (req, res) => {
  try {
    const dynamoNotes = await readNotesDynamo();
    res.send(dynamoNotes);
  } catch (error) {
    console.log(error);
  }
})

app.post("/api/dynamo", (req, res) => {
  try {
    console.log("\nAdding note...\n");
    console.log(req.body);
    createNoteDynamo(req.body);
  } catch (error) {
    console.log(error);
  }
  res.send();
});

app.delete("/api/dynamo/:id", (req, res) => {
  try {
    console.log("\nDeleting note...\n");
    deleteNoteDynamo(req.params.id);
  } catch (error) {
    console.log(error);
  }
  res.send();
});
////////////////////////////////////////////////

app.listen(5500, ()=>{
    console.log("\nServer running on port 5500\n");
})