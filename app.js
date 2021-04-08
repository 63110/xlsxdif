const express = require("express");
const multer  = require("multer");
var app     = express();

const path = require('path');
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));
//http.createServer(onRequest).listen(process.env.PORT || 3000);


const storageConfig = multer.diskStorage({
    destination: (req, files, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, files, cb) =>{
        cb(null, files.originalname);
    }
});
 
app.use(express.static(__dirname));
 
app.use(multer({storage:storageConfig}).array("filedata" ,3));
app.post("/uploads", function (req, res, next) {
    const untitled = require('./Untitled-2');
untitled.fistart();
   
    let filedata = req.files;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});


//sachak file
app.get('/download', function(req, res){
    const file = `${__dirname}`;
    res.download(filePath, fileName);  
  });
    