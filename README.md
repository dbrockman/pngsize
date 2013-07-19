# PNG size function

```
npm install pngsize
```

Function that reads the width and height of a PNG image by checking the IHDR header chunk. The function will only read the first 24 bytes of the file.

The function will also validate the PNG file signature.

```
var pngSize = require('pngsize');

//// Async
pngSize('image.png', function (err, size) {
  if (err) {
    // Error in fs.open, fs.read, fs.close
    // or the PNG signature is invalid.
  } else {
    console.log('size of image.png: %s x %s', size.width, size.height);
  }
});

//// Sync
try {
  var size = pngSize('image.png');
  console.log('size of image.png: %s x %s', size.width, size.height);
} catch (err) {
  // Error in fs.openSync, fs.readSync, fs.closeSync
  // or the PNG signature is invalid.
}

//// Read PNG data from buffer
// Note that pngSize only needs the first 24 bytes.
// Calling pngSize with a buffer will not throw an error if
// the signature is invalid but will return null.
var buffer = fs.readFileSync('image.png');
var size = pngSize(buffer);
if (size) {
  console.log('size of image.png: %s x %s', size.width, size.height);
} else {
  // the signature is invalid or buffer.length < 24
}
```
