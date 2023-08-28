const url3 = "api/v1.0/covtable_timeline";

// timeline.js
d3.json(url3).then(function(data) {
// Assuming you have the 'all_timeline' data
const reportDates = data.map(entry => entry.report_date);
const totalAdm = data.map(entry => entry.total_adm_all_covid_confirmed_past_7days);

new Chart( {
  type: 'line',
  data: {
    labels: reportDates,
    datasets: [
      {
        label: 'Total Admissions',
        data: totalAdm,
        borderColor: 'blue',
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'COVID Timeline: Total Admissions'
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM D'
          }
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Total'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  }
})});