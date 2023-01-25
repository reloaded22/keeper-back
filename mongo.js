// MONGODB /////////////////////////////////////////////////
const mongoose = require("mongoose");
// Connect to the Mongo database
// mongoose.connect("mongodb://localhost:27017/keeper-notes");
mongoose.connect(process.env.MONGO_URI);
// Create the schema for the future model
const noteSchema = new mongoose.Schema({
    title: String,
    content: String
});
// Create the model
const Note = new mongoose.model("Note", noteSchema);
////////////////////////////////////////////////////////////

const readNotesMongo = (res) => {

    Note.find((err, notes) => {
      if (!err) {
        console.log(
          `\nThere are ${notes.length} notes in the keeper-notes mongo database\n`
        );
        console.log("notes:");
        console.log(notes);
        res.send(notes);
      } else {
        console.log(err);
        res.send(err);
      }
    });
}

const createNoteMongo = (reqBody) => {
    const { title, content } = reqBody;
    // Create a new instance of the Note model and save it:
    const newNote = new Note({ title: title, content: content });
    newNote.save();
    console.log(`Note Added to MongoDB: ${JSON.stringify(newNote)}\n`);
}


const deleteNoteMongo = (id) => {

    console.log(`del_id: ${id}`);

    Note.deleteOne({_id:id},(err)=>{
        if (!err) {
            console.log("Note successfully deleted or No Error\n");
        } else console.log(err)
    });
}

module.exports ={
    readNotesMongo,
    createNoteMongo,
    deleteNoteMongo
}