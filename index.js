require('dotenv').config();
var express = require('express');
var app = express(); //Server
var mongoose = require('mongoose'); //DB ops
var port = process.env.PORT || 8080; //Set port
var imageSearch = require('node-google-image-search'); // Google Search API

//Connect to DB
mongoose.connect(process.env.DB);

//Search Schema
var SearchSchema = mongoose.Schema({
    term: String,
    when: String
});
//Search Model
var searchEntry = mongoose.model('searchEntry', SearchSchema);

//Ignore favicon requests
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

//Landing page (redirects to /)
app.get('/index.html', function(req, res) {
    return res.redirect('/');
});

//Root displays 10 most recent results
app.get('/', function(req, res) {
    //Find the 10 most recent searches in DB
    searchEntry.find({}, '-_id term when').sort('-when').limit(10).exec(function(err, results) {
        if (err) console.error(err);
        //Display results to user
        return res.send(results);
    });
});

//Image Search route 
app.get('/:searchTerm', function(req, res) {
    var searchTerm = req.params.searchTerm; //Get user's search term
    //Get offset value, which represents page number. Defaults to 0
    var offset = (req.query['offset'] - 1) * 10 || 0;
    //Get date and time of search
    var d = new Date();
    var searchTime = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    //Save search term and time in database
    var newSearch = new searchEntry({
        term: searchTerm,
        when: searchTime
    });
    newSearch.save().then(function(newSearch) {
        var filteredResults = []; //New array to display filtered results
        //Run Google Image Search API
        imageSearch(searchTerm, displayResults, offset, 10);
        
        //Filter and display results
        function displayResults(results) {
            //Extract desired fields into filteredResults
            results.forEach(function(obj) {
                filteredResults.push({
                    url: obj.link,
                    snippet: obj.snippet,
                    thumbnail: obj.image.thumbnailLink,
                    context: obj.image.contextLink
                });
            });
            //Display results to user
            res.send(filteredResults);
        }
    });
});

app.listen(port, function() {
    console.log('Server is listening on port ' + port);
});


