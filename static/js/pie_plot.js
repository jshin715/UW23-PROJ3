##timeline code 
@app.route("/api/v1.0/timeline")
def timeline():
    session = Session(engine)
    # Query required columns
    results = session.query(
        Covtable.report_date,
        Covtable.total_adm_all_covid_confirmed_past_7days,
        Covtable.admissions_covid_confirmed_week_over_week_percent_change
    ).all()
    session.close()
    # Prepare data for Plotly timeline
    dates = []
    confirmed_cases = []
    percent_change = []
    for row in results:
        dates.append(row.report_date)
        confirmed_cases.append(row.total_adm_all_covid_confirmed_past_7days)
        percent_change.append(row.admissions_covid_confirmed_week_over_week_percent_change)
    # Create a timeline plot using Plotly
    trace_confirmed = go.Scatter(
        x=dates,
        y=confirmed_cases,
        mode='lines+markers',
        name='Confirmed Cases'
    )
    trace_percent_change = go.Scatter(
        x=dates,
        y=percent_change,
        mode='lines+markers',
        name='Percent Change'
    )
    data = [trace_confirmed, trace_percent_change]
    layout = go.Layout(
        title='COVID-19 Timeline',
        xaxis=dict(title='Date'),
        yaxis=dict(title='Values')
    )
    fig = go.Figure(data=data, layout=layout)
    return fig.to_json()
  if __name__ == '__main__':
  app.run(debug=True)