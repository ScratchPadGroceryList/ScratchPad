// const
const PORT = 8080;

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// require
const io = require('socket.io')();
var app = require('express')();
var http = require('http').Server(app);

// non-application-specific helper functions.
function makeKey(length = 10, type = "alphanum") {
  let types = {
    alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    alphal: "abcdefghijklmnopqrstuvwxyz",
    alphau: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    alphanum: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    num: "0123456789"
  }
  if (length < 1) {
    return "";
  }
  let key = "";
  for (i = 0; i<length; i++) {
    if(i==0 && type="alphanum"){
      key += types[type][Math.floor((Math.random() * types[type].length) - 10)]
    }else{
      key += types[type][Math.floor(Math.random() * types[type].length)]
    }
  }
  return key;
}

//actually do things
app.get('/', function(req, res){
  res.send('');
});

http.listen(80, function(){
  console.log('listening on *:80');
});

// socket junk
io.on('connection', function(socket) {
  query();
});

//heroku pg junk
client.connect();

function query(q = "SELECT username FROM users") {
  client.query(q, (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(res.rows);
    console.log(JSON.stringify(row));
  }
  client.end();
  socket.emit('ping', "it's working");
  });
}
