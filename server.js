//Dependencies
const express = require('express');
const fs = require('fs');

var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use("/assets", express.static("./public/assets"));

require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT" + PORT);
});