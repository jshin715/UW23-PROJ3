url = '/data'
d3.json(url).then(function(response) {
    console.log(response);
})


// // Check to see if you get a 200 or 404
// const myRequest = new Request(url);

// fetch(myRequest).then((response) => {
//   console.log(response.status); //returns 200
// })
