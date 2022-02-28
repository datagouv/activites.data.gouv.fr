const express = require('express');
const app = express();

// Serve all the files in '/dist' directory
app.use(express.static('dist'));


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
