import sqlite3
import csv


csv_filename = '../Weekly_United_States_COVID-19_Hospitalization_Metrics_by_County.csv'
db_filename = 'database.sqlite'
table_name = 'data_table'

with open(csv_filename, 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    headers = next(csvreader)

conn = sqlite3.connect(db_filename)
cursor = conn.cursor()

columns = ', '.join([f'{header} TEXT' for header in headers])
# Drop the existing table if it exists
drop_table_query = f'DROP TABLE IF EXISTS {table_name}'
cursor.execute(drop_table_query)


create_table_query = f'CREATE TABLE {table_name} ({columns})'
cursor.execute(create_table_query)

with open(csv_filename, 'r') as csvfile:
    csvreader = csv.DictReader(csvfile)
    for row in csvreader:
        values = ', '.join([f"'{value}'" for value in row.values()])
        insert_query = f'INSERT INTO {table_name} ({", ".join(row.keys())}) VALUES ({values})'
        cursor.execute(insert_query)

conn.commit()
conn.close()

print("Database created and data inserted successfully.")