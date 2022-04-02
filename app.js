require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const isUrlHttp = require('is-url-http');

const app = express();
const port = process.env.PORT || 5000;

// Simple urls database class, clears on restart
class UrlsDb {
  constructor() {
    this.urls = [];
  }

  // Method to add new record to db
  setUrl(original_url) {
    // add new record
    const thisUrl = {
      short_url: this.urls.length + 1,
      original_url
    };
    this.urls.push(thisUrl);
    // return recorded object
    return thisUrl;
  }

  getUrl(short_url) {
    // try to find url by given short_url param or create an error object
    const thisUrl = this.urls.find((url) => url.short_url == short_url) || {
      error: 'unknown short url'
    };
    // return record object
    return thisUrl;
  }
}

const db = new UrlsDb();

// API MIDDLEWARE

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// parse application/x-www-form-urlencoded
app.use('/api/shorturl', bodyParser.urlencoded({ extended: false }));

// static routes
app.use('/public', express.static('node_modules/open-props'));
app.use('/public', express.static('public'));

// API ROUTES

// Index route, shows index.html page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API GET route
app.get('/api/shorturl/:shorturl', (req, res) => {
  const url = db.getUrl(req.params.shorturl);
  // redirect to original url
  if (url.original_url) res.redirect(url.original_url);
  // handle if no url in db
  else res.json(url);
});

// API POST route
app.post('/api/shorturl', (req, res) => {
  // if url is valid add it to db and return json with new record
  if (isUrlHttp(req.body.url)) {
    res.json(db.setUrl(req.body.url));

    // else return error json object
  } else {
    res.json({
      error: 'invalid url'
    });
  }
});

// SERVER RUN
app.listen(port, () => {
  console.log('Server running on port: ', port);
});
