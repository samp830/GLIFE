/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
 var keyword_extractor = require("keyword-extractor");
var express    = require('express'),
  app          = express(),
  watson       = require('watson-developer-cloud');

// Bootstrap application settings
require('./config/express')(app);

// Create the service wrapper
var toneAnalyzer = watson.tone_analyzer({
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/',
  username: '9ec05418-cee1-487e-a15f-8331fd3de51e',
  password: 'aPP6DRkJZKSL',
  version_date: '2016-05-19',
  version: 'v3'
});
app.get('/extractkeywords', function(req, res){
console.log(req.query.text);

 var extraction_result = keyword_extractor.extract(req.query.text,{
                                                                language:"english",
                                                                remove_digits: true,
                                                                return_changed_case:true,
                                                                remove_duplicates: false,
 
                                                           });
 res.json(extraction_result);
})


app.get('/', function(req, res) {
  res.render('index', {
    ct: req._csrfToken,
    ga: process.env.GOOGLE_ANALYTICS
  });
});

app.post('/api/tone', function(req, res, next) {
  toneAnalyzer.tone(req.body, function(err, data) {
    if (err) {
      return next(err);
    }
    return res.json(data);
  });
});

// error-handler application settings
require('./config/error-handler')(app);

module.exports = app;

