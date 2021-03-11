
const express = require('express');

const app = express();

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}index.html`)
})

app.listen(4000, () => {
    console.log('server is running on port 4000');
})