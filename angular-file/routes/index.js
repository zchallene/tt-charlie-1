var express = require('express');
var router = express.Router();
var multer = require('multer');
var DIR = './uploads/';
var upload = multer({dest: DIR}).single('photo');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'upload' });
});

//our file upload function.
router.post('/upload', function (req, res, next) {
     upload(req, res, function (err) {
      var type = req.file.mimetype.split('/');
      type = type[type.length-1];
      console.log(type);
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("Failure")
        }        
        else if(!(type==='jpeg'||type==='png')){
         res.status(422).send("Wrong type");
        } else {
          return res.send("Success"); 
        }
  });     
})
module.exports = router;