-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE covtable (
    state varchar NOT NULL,
    county varchar NOT NULL,
    fips_code numeric NOT NULL,
    county_population numeric NOT NULL,
    health_sa_name varchar NOT NULL,
    health_sa_number numeric NOT NULL,
    health_sa_population numeric NOT NULL,
    report_date date NOT NULL,
    week_end_date date NOT NULL,
    mmwr_report_week numeric NOT NULL,
    mmwr_report_year numeric NOT NULL,
    total_adm_all_covid_confirmed_past_7days numeric,
    total_adm_all_covid_confirmed_past_7days_per_100k numeric,
    total_adm_all_covid_confirmed_past_7days_per_100k_level varchar NOT NULL,
    admissions_covid_confirmed_week_over_week_percent_change numeric,
    admissions_covid_confirmed_week_over_week_percent_change_level varchar NOT NULL,
    avg_percent_inpatient_beds_used_confirmed_covid numeric,
    avg_percent_inpatient_beds_used_confirmed_covid_level varchar NOT NULL,
    abs_chg_avg_percent_inpatient_beds_occupied_covid_confirmed numeric,
    avg_percent_staff_icu_beds_covid numeric,
    avg_percent_staff_icu_beds_covid_level varchar NOT NULL,
    abs_chg_avg_percent_staff_icu_beds_covid numeric
);
ALTER TABLE covtable ADD COLUMN id SERIAL PRIMARY KEY;











