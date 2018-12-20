const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

let allWords = '';

fs.readFile('public/common_words.txt', "utf8", function(err, data) {
    allWords = data.split('\n');
});

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/words', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.send({ express: allWords });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
