const url = "api/v1.0/covtable";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});


// url = '/data'
// d3.json(url).then(function(response) {
//     console.log(response);
// })