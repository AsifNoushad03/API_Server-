const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const noteModel = require('./Models/noteModel')
const Notes = require("./Models/noteModel")

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})



// GET /api/v1/notes – List all Notes
app.get("/api/v1/notes", (req, res) => {
    noteModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
})


// GET /api/v1/notes/{id} – Get single Note with primary key id
app.get("/api/v1/notes/:id", async (req, res) => {

    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Note" })
    }
    const notes = await Notes.findById(id)
    if (!notes) {
        return res.status(404).json({ error: "No such Note" })
    }
    res.status(200).json(notes)
})


// POST /api/v1/notes – Create a new Note
app.post('/api/v1/notes', (req, res) => {
    const savenotes = new noteModel({
        title: req.body.title,
        body: req.body.body,
    });
    savenotes.save()
        .then((res) => { console.log('Notes Are  Created Sucessfully') })
        .catch((err) => { console.log(err) })
});

// PUT /api/v1/notes/{id} – Update Note with data provided in request
app.put('/api/v1/notes/:id', async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Note" })
    }
    const notes = await Notes.findOneAndUpdate({ id: id, }, {
        ...req.body
    })
    if (!notes) {
        return res.status(404).json({ error: "No such Note" })
    }
    res.status(200).json(notes)
});

// DELETE /api/v1/notes/{id} – Delete single Note with primary key id
app.delete('/api/v1/notes/:id', async (req, res) => {
    const id = req.params.id;
    await noteModel.findByIdAndRemove(id).exec();
    res.send('Notes Are  Deleted Successfully')
})


mongoose.connect("mongodb+srv://Asif123:mongo123@cluster0.mm6sdwf.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        //listen for requests
        app.listen(3001, () => {
            console.log('Connected to db & listenig on port 3001');
        })
    })
    .catch((err) => {
        console.log(err);
    })

