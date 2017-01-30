var express = require('express');
var app = express(); //Server
var mongoose = require('mongoose'); //DB ops
var config = require('./config');
var port = process.env.PORT || 8080; //Set port

//Connect to DB
mongoose.connect(config.urlDb);

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

app.get('/', function(req, res) {
    //Display 10 most recent searches
    searchEntry.find({}, '-_id term when').sort('-when').limit(10).exec(function(err, results) {
        if (err) console.error(err);
        return res.json(results);
    });
});


//Image Search route 
app.get('/:searchTerm', function(req, res) {
    var searchTerm = req.params.searchTerm; //Get user's search term
    var offset = req.query['offset'] || 10; //Get offset value; defaults to 10
    //Get date and time of search
    var d = new Date();
    var searchTime = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    //Save search term and time in database
    var newSearch = new searchEntry({
        term: searchTerm,
        when: searchTime
    });
    newSearch.save().then(function(newSearch) {
        //TO DO: implement Google Image API here, display results
        return res.send(`Search route: ${searchTerm} at ${searchTime}
                        <br>Offset: ${offset}`);
    });
});



app.listen(port, function() {
    console.log('Server is listening on port ' + port);
});

exports.searchEntry = searchEntry; //For use in other files
