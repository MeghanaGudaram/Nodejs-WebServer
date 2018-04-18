var Express = require('express');
var multer = require('multer');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var fs = require('fs');
var application = Express();

application.set('view engine', 'hbs');
application.use(Express.static('Images'));
application.use(bodyParser.json());
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, "example.jpg");
    }
});


var upload = multer({ storage: Storage }).array("imgUploader", 1);

application.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

application.get("/api/", (req, res) => {
	res.render('api.hbs', {});
});

application.get("/view", (req, res) => {
	
res.render('view.hbs', {
			
	});
});


application.get("/opencv", (req, res) => {

var sys = require('sys')

var exec = require('child_process').exec;

var child;

// executes `pwd`

child = exec("docker exec -i opencv4nodejs node examples/faceDetect/faceAndEyeDetection.js", function (error, stdout, stderr) {

  sys.print('stdout: ' + stdout);

  sys.print('stderr: ' + stderr);

  if (error !== null) {

    console.log('exec error: ' + error);

  }

});
res.render('opencv.hbs', {
			
	});
});

application.post("/api", function (req, res) {
	res.render('api.hbs', {
		
	});
    upload(req, res, function (err) {
        if (err) {
	    console.log("Something went wrong!");
        }
	console.log("File uploaded sucessfully!.");
    });
	
	
});

application.listen(3000, function (a) {
    console.log("Listening to port 3000");
});
