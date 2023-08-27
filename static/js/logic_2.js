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

const url_3 = "/api/v1.0/covtable_bargraph";

// Fetch the JSON data and create bar graph
d3.json(url_3).then(function(data2) {
  // Extract data for the two columns
  const states = data2.map(entry => entry.state);
  const avgInpatientBeds = data2.map(entry => entry.avg_percent_inpatient_beds_used_confirmed_covid);
  const avgStaffICUBeds = data2.map(entry => entry.avg_percent_staff_icu_beds_covid);

  // Create bar graph for average inpatient beds used
  const avgInpatientBedsTrace = {
    x: states,
    y: avgInpatientBeds,
    type: 'bar',
    name: 'Avg Inpatient Beds Used (%)'
  };

  // Create bar graph for average staff ICU beds
  const avgStaffICUBedsTrace = {
    x: states,
    y: avgStaffICUBeds,
    type: 'bar',
    name: 'Avg Staff ICU Beds (%)'
  };
// Create data array
let data2 = [avgInpatientBedsTrace , avgStaffICUBedsTrace ];
  const layout = {
    title: 'Average Bed Usage Data by State',
    barmode: 'group',
    // Include margins in the layout so the x-tick labels display correctly
    margin: {
    l: 50,
    r: 50,
    b: 200,
    t: 50,
    pad: 4
    }
  };

  const graphData = [avgInpatientBedsTrace, avgStaffICUBedsTrace];
  Plotly.newPlot('plot', graphData, layout);
});
