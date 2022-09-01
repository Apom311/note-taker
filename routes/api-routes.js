const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
const router = require("express").Router();
const path = require("path");

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    )

    return note;
}

router.get("/api/notes", function(req, res) {
    res.json(data);

});
router.post('/api/notes', (req, res) => {
    req.body.id = data.length.toString();
    let note = createNewNote(req.body, data);
    res.json(note);
})
// router.get("/api/notes/:id", function(req, res) {

//     res.json(data[Number(req.params.id)]);
// });

// router.post("/api/notes", function(req,res) {
//     let newNote = req.body;
//     let uniqueId = (data.length).toString();
//     console.log(uniqueId);
//     newNote.id = uniqueId;
//     data.push(newNote);

//     fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
//         if(err) throw(err);
//     });
// });


router.delete("/api/notes/:id", function(req,res) {

    let noteId = req.params.id;
    let newId = 0;
    console.log(`Deleting note with id ${noteId}`);
    data = data.filter(currentNote => {
        return currentNote.id != noteId;
    });
    for (currentNote of data) {
        currentNote.id = newId.toString();
        newId++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(data));
    res.json(data);
});

module.exports = router;