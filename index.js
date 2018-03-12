// const
const PORT = 8080;

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// require
const io = require('socket.io')();

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

// socket junk
io.on('connection', function(socket) {
});

//heroku pg junk
client.connect();

/*client.query('SELECT username FROM users', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
  socket.emit('ping', "it's working");
});*/
