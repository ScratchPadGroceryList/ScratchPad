// const
const PORT = 8080;

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
  for (; length > 0; length--) {
    key += types[type][Math.floor(Math.random() * types[type].length)]
  }
  return key;
}

// socket junk
io.on('connection', function(socket) {
  socket.emit('ping', "it's working");
});
