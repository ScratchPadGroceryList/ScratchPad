// const
const PORT = process.env.PORT || 5000;

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();

// require
const io = require('socket.io')();
var app = require('express')();
var http = require('http').Server(app);

// non-application-specific helper functions.
function makeKey(length = 10, type = "alphanum", prefix = null) {
  let types = {
    alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    alphal: "abcdefghijklmnopqrstuvwxyz",
    alphau: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    alphanum: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    num: "0123456789"
  }
  let key = "";
  if (prefix) {
    key += prefix;
    key += "-";
  }
  if (length < 1) {
    return key;
  }
  for (i = 0; i<length; i++) {
    key += types[type][Math.floor(Math.random() * types[type].length)];
  }
  return key;
}

//actually do things
app.get('/', function(req, res){
  res.send('');
});

http.listen(PORT, function(){
  console.log('listening on' + PORT);
});

// socket junk
io.on('connection', function(socket) {
  query();
});

//heroku pg junk

function query(q) {
  client.query(q, (err, res) => {
    if (err){
      console.log(err);
      return;
    }
    let output = {};
    for (let row of res.rows) {
      console.log(res.rows);
      console.log(JSON.stringify(row);
      output += (row);

    }
    console.log(output);
    //return output;
    io.emit('query return', output);
  });
}
