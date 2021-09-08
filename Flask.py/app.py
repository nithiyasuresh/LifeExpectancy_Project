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
# @app.route("/api/v1.0/life_expectancy")
# def names():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)
#     """Return a list of all passenger names"""
    # Query all passengers
#     results = session.query(life.name).all()
#     session.close()
#     # Convert list of tuples into normal list
#     all_names = list(np.ravel(results))
#     return jsonify(all_names)


# # Create a dictionary from the row data and append to a list of all_passengers
#     # all_passengers = []
#     # for name, age, sex in results:
#     #     passenger_dict = {}
#     #     passenger_dict["name"] = name
#     #     passenger_dict["age"] = age
#     #     passenger_dict["sex"] = sex
#     #     all_passengers.append(passenger_dict)
#     # return jsonify(all_passengers)

# if __name__ == '__main__':
#     app.run(debug=True)

# 
# @app.route('/list')
# def list():
#    con = sqlite3.connect("life_expectancy.db")
#    con.row_factory = sqlite3.Row
   
#    cur = con.cursor()
#    cur.execute("select * from life")
   
#    rows = cur.fetchall();
#    return render_template("list.html",rows = rows)

if __name__ == '__main__':
   app.run(debug = True)
