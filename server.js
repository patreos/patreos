var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/patr', express.static(path.join(__dirname, 'dist')));

app.get('/whitepaper', (req, res) =>{
    res.sendFile(path.join(__dirname + '/public/whitepaper/patreos_whitepaper_1_30_19.pdf'));
});

app.listen(3000);
console.log('Listening on port 3000');
