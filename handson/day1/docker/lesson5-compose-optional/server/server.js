var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Greetings from the container!')
})

app.listen(8080, function () {
  console.log('Basic Docker training application listening on port 8080!')
})
