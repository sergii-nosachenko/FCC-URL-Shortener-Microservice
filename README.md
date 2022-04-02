# FCC-URL-Shortener-Microservice

This tiny application takes url parameter from POST request to `/api/shorturl`
or by submitting the form on index page and returns json object with the next
structure:

```json
{
  "original_url": "", // Original url from request
  "short_url": "" // Short url for use with API endpoint
}
```

If you provide an invalid url it returns an error object.

To check your shortened url go to the url `/api/shorturl/[short_url]`.

[![Run on Repl.it](https://repl.it/badge/github/sergii-nosachenko/FCC-URL-Shortener-Microservice)](https://repl.it/github/sergii-nosachenko/FCC-URL-Shortener-Microservice)
