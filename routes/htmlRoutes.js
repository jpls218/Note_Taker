var path = require("path");

module.exports = function(app) {

  app.get("/notes", function (req, res) {
    console.log("tables page requested");
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  app.get("*", function (req, res) {
    console.log("home page requested");
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
