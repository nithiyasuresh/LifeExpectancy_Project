import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
import sqlite3

# #################################################
# # Database Setup
# #################################################
# engine = create_engine("sqlite:///life_expectancy.db")
# reflect an existing database into a new model
# Base = automap_base()
# reflect the tables
# Base.prepare(engine, reflect=True)
# Save reference to the table
# Life_data = Base.classes.life_expectancy

# #################################################
# # Flask Routes
# #################################################

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


