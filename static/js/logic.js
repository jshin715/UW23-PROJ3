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
  let pie_data = [];

  pie_data = col_one;
  const sliceLimit = 10; // Change this to your desired slice limit
      let sortedData = Object.entries(pie_data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, sliceLimit);
      let labels = sortedData.map(entry => entry[0]);
      let values = sortedData.map(entry => entry[1]);

    let data1 = [{
      values: values,
      labels: labels,
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
      const sliceLimit = 10; // Change this to your desired slice limit
      let sortedData = Object.entries(pie_data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, sliceLimit);
      let labels = sortedData.map(entry => entry[0]);
      let values = sortedData.map(entry => entry[1]);

      Plotly.restyle('pie', 'labels', [labels]);
      Plotly.restyle('pie', 'values', [values]);
    });


});
const url3 = "api/v1.0/covtable_bargraph";

// Fetch the JSON data and create bar graph
d3.json(url3).then(function(data) {
   console.log(data);
  col_one_2 = {};
  col_two_2 = {};

  for (let i = 0; i < data.length; i++) {
    col_one_2[data[i].state] = data[i].avg_percent_inpatient_beds_used_confirmed_covid;
    col_two_2[data[i].state] = data[i].avg_percent_staff_icu_beds_covid;
  }

  let bar_data = col_one_2;

  // Initial bar graph setup
  let data2 = [{
    x: Object.keys(bar_data), // States on the x-axis
    y: Object.values(bar_data), // Data values on the y-axis
    type: "bar"
  }];

  let layout = {
    title: 'Average Bed Usage Data by State',
    xaxis: {
      title: 'States'
    },
    yaxis: {
      title: 'Value'
    },
    height: 600,
    width: 1200
  };

  Plotly.newPlot("bar", data2, layout);

  d3.selectAll("#selDataset_2").on("change", function() {
    let dropdownMenu_2 = d3.select("#selDataset_2");
    let dataset_2 = dropdownMenu_2.property("value");

    bar_data = {}
    if (dataset_2 == 'avg_percent_inpatient_beds_used_confirmed_covid') {
      bar_data = col_one_2;
    } else {
      bar_data = col_two_2;
    }
  
    for (let i = 0; i < data.length; i++) {
      col_one_2[data[i].state] = data[i].avg_percent_inpatient_beds_used_confirmed_covid;
      col_two_2[data[i].state] = data[i].avg_percent_staff_icu_beds_covid;
    }

    // Update bar graph data
    let updatedData = [{
      x: Object.keys(bar_data),
      y: Object.values(bar_data),
      type: "bar"
    }];

    Plotly.newPlot("bar", updatedData, layout);
  });
});

