var express = require('express');
var app = express();
const uuidv4 = require('uuid/v4');
var bodyParser = require('body-parser');
const cypress = require('cypress');
const compare = require('resemblejs').compare;
const fs = require("mz/fs");

const ruta_screenshots = 'cypress/screenshots';
const ruta_http_screenshots = 'static/screenshots';



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
    //res.json({ message: 'Bienvenido al api rest' });
});

router.get('/api', function(req, res) {
    res.json({ message: 'Bienvenido al api rest' });
});

router.route('/ejecutarPrueba').get(function(req, res) {

	var nombreArchivo = uuidv4();

  var rutaArchivo1 = ruta_screenshots +"/"+ nombreArchivo+"1.png";
  var rutaArchivo2 = ruta_screenshots +"/"+ nombreArchivo+"2.png";
  var rutaSalida = 'public/comparacion/' + nombreArchivo + "-salida.png";

  var rutaHttpArchivo1 = ruta_http_screenshots +"/"+ nombreArchivo+"1.png";
  var rutaHttpArchivo2 = ruta_http_screenshots +"/"+ nombreArchivo+"2.png";
  var rutaSalidaHttp = 'static/comparacion/' + nombreArchivo + "-salida.png";

	cypress.run({
		spec: './cypress/integration/colores.js',
		env:{
			screen: nombreArchivo,
		}
	}
	)
	.then((results) => {
		console.log(results)
		const options = {};
		// The parameters can be Node Buffers
		// data is the same as usual with an additional getBuffer() function
		compare(rutaArchivo1, rutaArchivo2, options, function (err, data) {
		if (err) {
			console.log('An error!' + err)
		} else {

			fs.writeFile(rutaSalida, data.getBuffer());
			    /*
			    {
			    misMatchPercentage : 100, // %
			    isSameDimensions: true, // or false
			    dimensionDifference: { width: 0, height: -1 }, // defined if dimensions are not the same
			    getImageDataUrl: function(){}
			    }
			    */
		}
		});


	})
	.catch((err)=>{console.error(err)})

  var conts = fs.readFileSync("testJSON.json");
  var parse_obj = JSON.parse(conts);
  var f = new Date();
  parse_obj['prueba'].push({"fecha":f,"imagen1":rutaHttpArchivo1,"imagen2":rutaHttpArchivo2,"imagenComp":rutaSalidaHttp});
  Str_txt = JSON.stringify(parse_obj);
  fs.writeFile("testJSON.json", Str_txt);

  res.json("OK");
  });


router.route('/consultar').get(function(req, res) {
  var conts = fs.readFileSync("testJSON.json");
  var parse_obj = JSON.parse(conts);
  //res.status(200).jsonp(parse_obj);
  res.write(conts);
  res.end();
});

  // REGISTER OUR ROUTES -------------------------------
  // all of our routes will be prefixed with /api
  app.use('/', router);
  app.use('/api', router);
  app.use('/static', express.static(__dirname + '/public'));
  app.use('/static', express.static(__dirname + '/node_modules'));
  app.use('/static', express.static(__dirname + '/cypress'));



app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
