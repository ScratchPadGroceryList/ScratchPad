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

//list of all active users, in a {family_key:{user_token:{**INFO**}}} system. includes socketId.
let activeUsers = {
  //init with test family
  'testFamKey':{
    'testUserToken1': {
      'socketId': null,

    },
    'testUserToken2': {
      'socketId': null,
    }
  }
};

//actually do things
app.get('/', (req, res) => {
  res.send('');
});

http.listen(PORT, () => {
  console.log('listening on ' + PORT);
});

// socket junk
io.on('connection', (socket) => {

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
      console.log(JSON.stringify(row));
      output += (row);

    }
    console.log(output);
    //return output;
    io.emit('query return', output);
  });
}

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
    if(i==0 && type=="alphanum"){
      key += types[type][Math.floor((Math.random() * types[type].length) - 10)]
    }else{
      key += types[type][Math.floor(Math.random() * types[type].length)]
    }
  }
  return key;
}
