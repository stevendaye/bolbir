/* Script to run our production server */
import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';
import favicon from 'serve-favicon';

const port = process.env.PORT || 3000;
const app = express();

app.use(compression());
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'assets', 'bolbir.ico')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server running in production at https://www.bolbir.herokuapp.com");
    // open(`http://localhost:${port}`);
  }
});