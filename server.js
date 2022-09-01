//Dependencies
const express = require('express');
const app = express();
const htmlRoutes = require('./routes/html-routes');
const apiRoutes = require('./routes/api-routes')
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use("/assets", express.static("./public/assets"));

app.use('/', htmlRoutes);
app.use('/', apiRoutes);

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});