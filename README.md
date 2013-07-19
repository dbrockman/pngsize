# PNG size function

```
npm install pngsize
```

Function that reads the width and height of a PNG image by checking the IHDR header chunk. The function will only read the first 24 bytes of the file.

The function will also validate the PNG file signature.

```
var pngSize = require('pngsize');

// Async
pngSize('image.png', function (err, size) {
  console.log('size of image.png: %s x %s', size.width, size.height);
});

// Sync
var size = pngSize('image.png');
console.log('size of image.png: %s x %s', size.width, size.height);

// Read PNG data from buffer
// Note that pngSize only needs the first 24 bytes.
var buffer = fs.readFileSync('image.png');
var size = pngSize(buffer);
console.log('size of image.png: %s x %s', size.width, size.height);
```
