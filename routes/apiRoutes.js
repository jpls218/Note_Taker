const fs = require("fs");
const path = require("path");
var noteData = [];


module.exports = function(app) {

  fs.readFile("./db/db.json", "utf-8", function(err, data) {
    if (err) throw err;
    noteData = JSON.parse(data);
  });

  app.get("/api/notes", function(req, res) {
    res.json(noteData);
  });

  app.post("/api/notes", function(req, res) {
    let newnote = req.body;
    noteData.push(newnote);
    upDb();
    console.log("New note added: " + newnote.title);
        
  });
  
  app.get("/api/notes/:id", function(req, res) {
    res.json(noteData[req.params.id]);
  });
  

  app.delete("/api/notes/:id", function(req, res) {
    noteData.splice(req.params.id, 1);
    upDb();
    console.log("Deleted the note with id " + req.params.id);
  });

  function upDb() {
    fs.writeFile("./db/db.json", JSON.stringify(noteData, "\t"), (err) => {
      if (err) throw err;
      return true;
    });
  }
};
