
// Creating Model of Notes
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
})
const noteModel = mongoose.model("Notes", noteSchema)
module.exports = noteModel