var express = require('express');
var bodyParser = require('body-parser');
var check = require('express-validator').check;
var validationResult = require('express-validator').validationResult;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: './test' });
});

app.post('/data', [
  check('email')
    .isEmail()
    .withMessage('must be an email'),
  check('username')
    .isLength({ min: 6 })
    .withMessage('ust be at least 6 chars long')
], function (req, res) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.mapped() });
  }
  res.json({ msg: 'success' });
});

app.listen(4000);
