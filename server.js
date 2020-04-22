/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!
**********************/
const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'user_db',
	user: 'postgres',
	password: 'duncan4788'
};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory



const userInfo = [];

/*********************************
 Below we'll add the get & post requests which will handle:
   - Database access
   - Parse parameters from get (URL) and post (data package)
   - Render Views - This will decide where the user will go after the get/post request has been processed
************************************/

// login page
app.get('/', function(req, res) {	
	res.render('login',{
		//local_css:"signin.css",
		my_title:"Login Page",
		goodLogin: true
	});
});

// verifying login 
app.post('/auth', function(req,res) {
	// user verification logic goes here
	var userEmail = req.body.email;
	var userPassword = req.body.password;
	var query = 'SELECT * FROM userData WHERE email = ' + '\'' + userEmail + '\'' + ' AND password = ' + '\'' + userPassword + '\'' + ';';
	db.any(query)
		.then(function(rows) { 						
			if(rows[0]){ // succsessful login				
				userInfo.push(rows[0])				
				res.render('userHub',{
					my_title:"User Hub",
					data: rows[0],
					
				});
			}
			else{ // user login failed
				res.render('login',{
					//local_css:"signin.css",
					my_title:"Login Page",
					goodLogin: false
				});
			}


		})
		.catch(function(err) {
			console.log('error',err);


		})
});

// create profile page
app.get('/create-profile',function(req,res) {
	res.render('create-profile', {
		my_title: "Create Profile Page"
	});
});

//edit profile page
app.get('/edit-profile', function(req,res) {
	res.render('edit-profile', {userInfo: userInfo})
});

// userHub page
app.get('/userHub', function(req, res) {
	res.render('userHub',{
		my_title:"User Hub"
	});
});


/*Add your other get/post request handlers below here: */


app.listen(3000);
console.log('3000 is the magic port');
