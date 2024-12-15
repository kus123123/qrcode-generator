const express = require('express');
const generatorQR = require('./controller.js');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(bodyParser.json());


app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/test', (req, res) => {
    res.send('Hello World');
});
app.post('/generateQR', generatorQR.generatorQR);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

