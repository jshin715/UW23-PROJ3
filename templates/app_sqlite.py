import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///database.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
Covtable = Base.classes.data_table

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/data_table<br/>" 
    )


@app.route("/api/v1.0/data_table")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(Covtable.state).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)

if __name__ == '__main__':
    app.run(debug=True)

import sqlite3

db_filename = 'database.db'

conn = sqlite3.connect(db_filename)
cursor = conn.cursor()

query = 'SELECT * FROM your_table'
cursor.execute(query)

rows = cursor.fetchall()
for row in rows:
    print(row)

conn.close()
