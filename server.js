var port       = process.env.PORT || 3000
var staticPage = __dirname + '/public/';

let ts = Date.now();

let dateNow = new Date(ts);
let date    = dateNow.getDate();
let month   = dateNow.getMonth() + 1;
let year    = dateNow.getFullYear();
let hours   = dateNow.getHours();
let minutes = dateNow.getMinutes();

const express = require('express');
const app     = express();
app.use(express.static(staticPage));

app.listen(port, ()=>{
    console.log(`Escuchando por el puerto ${port}`);
    console.log(year + "-" + month + "-" + date + " / " + hours + " : " + minutes);
});