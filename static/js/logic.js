const url = "api/v1.0/covtable";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  // console.log(data);
});

const url2 = "api/v1.0/covtablebystate";

// Fetch the JSON data and console log it
d3.json(url2).then(function(data) {
  
  col_one = {}
  col_two={}

  for (let i = 0; i < data.length; i++){
    col_one[data[i].state]=data[i].total_adm_all_covid_confirmed_past_7days
    col_two[data[i].state]=data[i].total_adm_all_covid_confirmed_past_7days_per_100k
  }

    let data1 = [{
      values: Object.values(col_one),
      labels: Object.keys(col_one),
      type: "pie"
    }];
  
    let layout = {
      height: 600,
      width: 800
    };
  Plotly.newPlot("pie", data1, layout);

    d3.selectAll("#selDataset").on("change", function(){
      let dropdownMenu = d3.select("#selDataset");

      let dataset = dropdownMenu.property("value");

      let pie_data = [];

      if (dataset == 'total_adm_all_covid_confirmed_past_7days'){
        pie_data = col_one;
      }
      else {
        pie_data = col_two;
      }

      Plotly.restyle("pie", "values", [Object.values(pie_data)])
    });


});




// url = '/data'
// d3.json(url).then(function(response) {
//     console.log(response);
// })