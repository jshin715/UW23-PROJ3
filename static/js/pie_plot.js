
const url3 = "api/v1.0/covtable_bargraph";

// Fetch the JSON data and console log it
d3.json(url3).then(function(data) {
  
  col_one_2 = {}
  col_two_2={}

  for (let i = 0; i < data.length; i++){
    col_one[data[i].state]=data[i].avg_percent_inpatient_beds_used_confirmed_covid
    col_two[data[i].state]=data[i].avg_percent_staff_icu_beds_covid
  }
  let bar_data = [];

  bar_data = col_one_2;
  const sliceLimit = 10; // Change this to your desired slice limit
      let sortedData_2 = Object.entries(bar_data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, sliceLimit);
      let labels = sortedData_2.map(entry => entry[0]);
      let values = sortedData_2.map(entry => entry[1]);

    let data2 = [{
      values: values,
      labels: labels,
      type: "bar"
    }];
  
    let layout = {
      height: 600,
      width: 800
    };
  Plotly.newPlot("bar", data2, layout);

    d3.selectAll("#selDataset_2").on("change", function(){
      let dropdownMenu_2 = d3.select("#selDataset_2");

      let dataset_2 = dropdownMenu_2.property("value_2");

      let bar_data = [];

      if (dataset_2 == 'total_adm_all_covid_confirmed_past_7days'){
        bar_data = col_one_2;
      }
      else {
        bar_data = col_two_2;
      }
      const sliceLimit = 10; // Change this to your desired slice limit
      let sortedData = Object.entries(pie_data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, sliceLimit);
      let labels_2 = sortedData_2.map(entry_2 => entry_2[0]);
      let values_2 = sortedData_2.map(entry_2 => entry_2[1]);

      Plotly.restyle('bar', 'labels', [labels_2]);
      Plotly.restyle('bar', 'values', [values_2]);
    });


});

