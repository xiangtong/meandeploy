var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();
var Assert = require('assert');
var bcrypt = require('bcrypt')
var session = require('express-session')
app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'node_modules')));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie:{secure:false}
}))
require('./server/config/mongoose.js')
require('./server/config/routes.js')(app)


app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
