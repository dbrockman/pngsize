var fs = require('fs');

module.exports = pngSize;

function pngSize(filename, callback) {
  if (Buffer.isBuffer(filename)) {
    return validate(filename) ? readSize(filename) : null;
  }
  var buffer = new Buffer(24);
  if (!callback) {
    var fd = fs.openSync(filename, 'r');
    fs.readSync(fd, buffer, 0, 24, 0);
    fs.closeSync(fd);
    if (!validate(buffer)) {
      throw new Error('PNG file has invalid signature');
    }
    return readSize(buffer);
  }
  fs.open(filename, 'r', function (err, fd) {
    if (err) {
      callback(err);
    } else {
      fs.read(fd, buffer, 0, 24, 0, function (err) {
        fs.close(fd, function (err2) {
          if (err || err2) {
            callback(err || err2);
          } else if (validate(buffer)) {
            callback(null, readSize(buffer));
          } else {
            callback(new Error('PNG file has invalid signature'));
          }
        });
      });
    }
  });
}

function validate(buffer) {
  return buffer.length >= 24 && buffer.toString('hex', 0, 8) === '89504e470d0a1a0a';
}

function readSize(buffer) {
  return {
    width:  buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}
