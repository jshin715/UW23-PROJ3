import os
import psycopg2
from flask import Flask, render_template, jsonify
app = Flask(__name__)
columns = []
def get_db_connection():
    conn = psycopg2.connect(database="COVID19",
                            user="postgres",
                            password="postgres",
                            host="localhost", port="5432")
    return conn
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''SELECT * FROM "covtable";''')
    columns=[x[0] for x in conn.description]
    data = cur.fetchall()
    json_data = []
    for result in data:
        json_data.append(dict(zip(columns,result))) 

    cur.close()
    conn.close()
    return jsonify(data=data)

if __name__ == "__main__":
    app.run(debug=True)