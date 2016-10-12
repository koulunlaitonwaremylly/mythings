//
// # HelloAngular server
//

var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'c9'
  });

  connection.connect(function(err){
    if(err){
      console.log('mySql Broken!');
     // res.send('mySql Broken!'); // experimental
    }
    else{
      console.log('mySql Okke!');
    //  res.send('mySql Okke!'); // experimental
    }
  
  });


const express = require('express'); 				        // create our app w/ express
const app = express();
const port = process.env.port || 8080; 				      // set the port

// application -------------------------------------------------------------
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// REST API for manipulating things
app.get('/api/things', function (req, res) {
    connection.query('SELECT name, description, lat, lon FROM missles', function (err, rows, fields){
    if(err) throw err;
    res.json(rows);
    console.log(rows);
    
});
});
    
    
    /* res.json(
        [
            {
              name: 'BeagleBone Black',
              description: 'Nice SBC!',
              location: {
                lat: 62.596,
                lng: 29.777
              }
            },
            {
              name: 'Crescent Bicycle',
              description: 'Swedish quality!',
              location: {
                lat: 62.599,
                lng: 29.770
              }
            }
        ]
    );
}); */

// where to load static resources, like html files, gif files, css files etc.
app.use(express.static('client'));

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("MyThings app listening on port " + port);