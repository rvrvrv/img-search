require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose'); // DB ops
const imageSearch = require('node-google-image-search'); // Google Search API
const path = require('path');

const indexPage = path.join(`${__dirname}/index.html`);

// Connect to DB
mongoose.connect(process.env.DB);

// Search Schema
const SearchSchema = mongoose.Schema({
  term: String,
  when: String
});

// Search Model
const SearchEntry = mongoose.model('searchEntry', SearchSchema);

// Ignore favicon requests
app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

// Landing page
app.get('/', (req, res) => res.sendFile(indexPage));
app.get('/index.html', (req, res) => res.sendFile(indexPage)); // Disallow index.html as searchTerm param

// Route for image search
app.get('/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm; // Get user's search term
  // Get offset value, which represents page number. Defaults to 0
  const offset = (req.query.offset - 1) * 10 || 0;
  // Get date and time of search
  const d = new Date();
  const searchTime = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  // Save search term and time in database
  const newSearch = new SearchEntry({
    term: searchTerm,
    when: searchTime
  });
  newSearch.save().then(() => {
    const filteredResults = []; // New array to display filtered results
    // Run Google Image Search API
    imageSearch(searchTerm, displayResults, offset, 10);

    // Filter and display results
    function displayResults(results) {
      // Extract desired fields into filteredResults
      results.forEach((obj) => {
        filteredResults.push({
          url: obj.link,
          snippet: obj.snippet,
          thumbnail: obj.image.thumbnailLink,
          context: obj.image.contextLink
        });
      });
      // Display results to user
      res.send(filteredResults);
    }
  });
});

// Route for most recent searches
app.get('/api/recent', (req, res) => {
  // Find the 10 most recent searches in DB
  SearchEntry.find({}, '-_id term when').sort('-when').limit(10).exec((err, results) => {
    if (err) console.error(err);
    // Display results to user
    return res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
