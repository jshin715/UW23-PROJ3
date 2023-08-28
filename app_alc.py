import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import plotly.graph_objs as go
from flask import Flask, jsonify, render_template

import pandas as pd

from pathlib import Path

database="COVID19",
username="postgres",
password="postgres",
host="localhost"
port="5432"
#################################################
# Database Setup
#################################################
#database_url = 'postgresql://<username>:<password>@<host>:<port>/<database>'
database_url1 = 'postgresql://postgres:Yell4me1$@localhost:5432/COVID19'
engine = create_engine(database_url1)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
Covtable = Base.classes.covtable#

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return render_template('index.html')

@app.route("/api/v1.0/covtable")
def table():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(Covtable.state,
        Covtable.county,
        Covtable.fips_code,
        Covtable.county_population,
        Covtable.health_sa_name,
        Covtable.health_sa_number,
        Covtable.health_sa_population,
        Covtable.report_date,
        Covtable.week_end_date,
        Covtable.mmwr_report_week,
        Covtable.mmwr_report_year,
        Covtable.total_adm_all_covid_confirmed_past_7days,
        Covtable.total_adm_all_covid_confirmed_past_7days_per_100k,
        Covtable.total_adm_all_covid_confirmed_past_7days_per_100k_level,
        Covtable.admissions_covid_confirmed_week_over_week_percent_change,
        Covtable.admissions_covid_confirmed_week_over_week_percent_change_level,
        Covtable.avg_percent_inpatient_beds_used_confirmed_covid,
        Covtable.avg_percent_inpatient_beds_used_confirmed_covid_level,
        Covtable.abs_chg_avg_percent_inpatient_beds_occupied_covid_confirmed,
        Covtable.avg_percent_staff_icu_beds_covid,
        Covtable.avg_percent_staff_icu_beds_covid_level,
        Covtable.abs_chg_avg_percent_staff_icu_beds_covid).all()

    session.close()
    
    # Create a dictionary from the row data and append to a list of all_passengers
    all_covtable = []
    for state, county, fips_code, county_population, health_sa_name, health_sa_number, health_sa_population,  report_date, week_end_date ,mmwr_report_week ,mmwr_report_year ,total_adm_all_covid_confirmed_past_7days ,total_adm_all_covid_confirmed_past_7days_per_100k ,total_adm_all_covid_confirmed_past_7days_per_100k_level ,admissions_covid_confirmed_week_over_week_percent_change ,admissions_covid_confirmed_week_over_week_percent_change_level ,avg_percent_inpatient_beds_used_confirmed_covid ,avg_percent_inpatient_beds_used_confirmed_covid_level ,abs_chg_avg_percent_inpatient_beds_occupied_covid_confirmed ,avg_percent_staff_icu_beds_covid ,avg_percent_staff_icu_beds_covid_level ,abs_chg_avg_percent_staff_icu_beds_covid in results :      
        covtable_entry = {
            "state": state,
            "county": county,
            "fips_code": fips_code,
            "county_population": county_population,
            "health_sa_name": health_sa_name,
            "health_sa_number": health_sa_number,
            "health_sa_population": health_sa_population,
            "report_date": report_date,
            "week_end_date": week_end_date,
            "mmwr_report_week": mmwr_report_week,
            "mmwr_report_year": mmwr_report_year,
            "total_adm_all_covid_confirmed_past_7days": total_adm_all_covid_confirmed_past_7days,
            "total_adm_all_covid_confirmed_past_7days_per_100k": total_adm_all_covid_confirmed_past_7days_per_100k,
            "total_adm_all_covid_confirmed_past_7days_per_100k_level": total_adm_all_covid_confirmed_past_7days_per_100k_level,
            "admissions_covid_confirmed_week_over_week_percent_change": admissions_covid_confirmed_week_over_week_percent_change,
            "admissions_covid_confirmed_week_over_week_percent_change_level": admissions_covid_confirmed_week_over_week_percent_change_level,
            "avg_percent_inpatient_beds_used_confirmed_covid": avg_percent_inpatient_beds_used_confirmed_covid,
            "avg_percent_inpatient_beds_used_confirmed_covid_level": avg_percent_inpatient_beds_used_confirmed_covid_level,
            "abs_chg_avg_percent_inpatient_beds_occupied_covid_confirmed": abs_chg_avg_percent_inpatient_beds_occupied_covid_confirmed,
            "avg_percent_staff_icu_beds_covid": avg_percent_staff_icu_beds_covid,
            "avg_percent_staff_icu_beds_covid_level": avg_percent_staff_icu_beds_covid_level,
            "abs_chg_avg_percent_staff_icu_beds_covid": abs_chg_avg_percent_staff_icu_beds_covid,
        }
        all_covtable.append(covtable_entry)
    
         
    return jsonify(all_covtable)

@app.route("/api/v1.0/covtablebystate")
def statetable():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    sel = [Covtable.state, 
        func.sum(Covtable.total_adm_all_covid_confirmed_past_7days), 
        func.avg(Covtable.total_adm_all_covid_confirmed_past_7days_per_100k)] 
    results = session.query(*sel).\
        filter(Covtable.state != "Northern Mariana Islands").\
        group_by(Covtable.state).\
        order_by(Covtable.state).all()
    results
    session.close()
    
    # Create a dictionary from the row data and append to a list of all_passengers
    all_covtablebystate = []
    for state, total_adm_all_covid_confirmed_past_7days, total_adm_all_covid_confirmed_past_7days_per_100k in results :      
        # print(type(total_adm_all_covid_confirmed_past_7days))
        covtablebystate_entry = {
            "state": state,
            "total_adm_all_covid_confirmed_past_7days": int(total_adm_all_covid_confirmed_past_7days),
            "total_adm_all_covid_confirmed_past_7days_per_100k":float(total_adm_all_covid_confirmed_past_7days_per_100k)
        }
        all_covtablebystate.append(covtablebystate_entry)

    return jsonify(all_covtablebystate)


    ## bar graph 
@app.route("/api/v1.0/covtable_bargraph")
def bar_table():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    sel = [Covtable.state, 
        func.avg(Covtable.avg_percent_inpatient_beds_used_confirmed_covid), 
        func.avg(Covtable.avg_percent_staff_icu_beds_covid)] 
    results = session.query(*sel).\
        filter(Covtable.state != "Northern Mariana Islands").\
        group_by(Covtable.state).\
        order_by(Covtable.state).all()
    results
    session.close()
    
    # Create a dictionary from the row data and append to a list of all_passengers
    all_covtable_bargraph = []
    for state, avg_percent_inpatient_beds_used_confirmed_covid, avg_percent_staff_icu_beds_covid in results :      
        # print(type(total_adm_all_covid_confirmed_past_7days))
        covtable_bargraph_entry2 = {
            "state": state,
            "avg_percent_inpatient_beds_used_confirmed_covid": float(avg_percent_inpatient_beds_used_confirmed_covid),
            "avg_percent_staff_icu_beds_covid":float(avg_percent_staff_icu_beds_covid)
        }
        all_covtable_bargraph.append(covtable_bargraph_entry2)

    return jsonify(all_covtable_bargraph)

@app.route("/api/v1.0/covtable_timeline")
def timeline_table():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query and group data by report_date while summing the total_adm_all_covid_confirmed_past_7days
    results = session.query(
        Covtable.report_date,
        func.sum(Covtable.total_adm_all_covid_confirmed_past_7days)
    ).group_by(Covtable.report_date).order_by(Covtable.report_date).all()

    session.close()
    
    # Create a list of dictionaries for the results
    all_covtable_timeline = []
    for report_date, total_adm_all_covid_confirmed_past_7days in results:
        covtable_timeline_entry = {
            "report_date": report_date,
            "total_adm_all_covid_confirmed_past_7days": total_adm_all_covid_confirmed_past_7days,
        }
        all_covtable_timeline.append(covtable_timeline_entry)

    return jsonify(all_covtable_timeline)



if __name__ == '__main__':
    app.run(debug=True)
