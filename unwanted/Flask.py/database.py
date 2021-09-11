# from config import *
# %config Completer.use_jedi = False

import pandas as pd
import csv
from sqlalchemy import Integer, String, Float, Column
from sqlalchemy.orm import Session

# Imports the method used for connecting to DBs
from sqlalchemy import create_engine

# Imports the methods needed to abstract classes into tables
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base

from flask import Flask, jsonify
import sqlite3
from sqlite3 import Error

def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    create_connection("Flask.py/life_expectancy.db")
    
from flask import Flask, jsonify    

engine = create_engine('sqlite:///Flask.py/life_expectancy.db')

session = Session(engine)

csv_file = "../Life Expectancy Data.csv"
life_expectancy_df = pd.read_csv(csv_file)
life_expectancy_df.reset_index()
life_expectancy_df.head()

life_expectancy_df = life_expectancy_df[["Country","Year","Life Expectancy","Adult Mortality","BMI","GDP","Population","Polio","HIV/AIDS","Hepatitis B","Measles"]]
life_expectancy_df

life_df = life_expectancy_df.sort_values(by=["Country","Year"])
life_clean_df = life_df.dropna()
life_clean_df.reset_index(drop=True)

table_name = 'life'

life_clean_df.to_sql(
    table_name,
    engine,
    if_exists='replace',
    index=False,
    chunksize=500,
    dtype={
        "Country": String,
        "Year": Integer,
        "Life_Expectancy": Float,
        "Adult_Mortality": Float,
        "BMI": Float,
        "GDP": Float,
        "Population": Float,
        "Polio": Float,
        "HIV_AIDS": Float,
        "Hepatitis_B": Float,
        "Measles": Float
    }
)

results = engine.execute("SELECT * FROM life")
pd.DataFrame(results).rename(columns = {0:'Country',1:'Year',2:'Life_Expectancy',3:'Adult_Mortality',4:'BMI' ,5:'GDP' ,6:'Population',7:'Polio' ,8:'HIV_AIDS' ,9:'Hepatitis_B' ,10:'Measles'})

app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/life_expectancy<br/>"
        
    )

@app.route("/api/v1.0/life_expectancy")
def life_expectancy():
    """Return the list of station data as json"""

    # Station query
    lifeExpect = session.query(life.Country, life.Year, life.BMI, life.GDP).all() 

    # Close session
    session.close()

    # Return jsonify stations
    return jsonify(life_expectancy=lifeExpect)

if __name__ == '__main__':
   app.run(debug = True)