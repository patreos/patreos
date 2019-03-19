var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/whitepaper/patreos_whitepaper_1_30_19.pdf', (req, res) =>{
    res.setHeader("Content-Type","application/pdf");
    res.setHeader("Content-Dispositon", "attachment; filename=" + "patreos_whitepaper_1_30_19.pdf");
    res.sendFile(path.join(__dirname + '/public/whitepaper/patreos_whitepaper_1_30_19.pdf'));
});

app.use('/*', express.static(path.join(__dirname, 'dist')));

app.listen(3000);
console.log('Listening on port 3000');
