import sqlite3
from flask import Flask, jsonify, request, render_template

#define app
app = Flask(__name__)

#define database path
DATABASE_NAME = "data/db.sqlite"

#define database GET Requests
def get_db():
    conn = sqlite3.connect(DATABASE_NAME)
    return conn

def get_by_country(country):
    db = get_db()
    cursor = db.cursor()
    statement = "SELECT * FROM Life WHERE Country LIKE ?"
    cursor.execute(statement, [country])
    return cursor.fetchall()


def get_all():
    db = get_db()
    cursor = db.cursor()
    query = "SELECT * FROM Life"
    cursor.execute(query)
    return cursor.fetchall()    

@app.route("/")
def home():
    return render_template("index.html")

# define App routes to call GET Methods
# @app.route('/countries', methods=["GET"])
# def get_all_countries():
#     countries = get_all()
#     return jsonify(countries)


# @app.route('/country/<country>', methods=["GET"])
# def get_country(country):
#     countries = get_by_country(country)
#     return jsonify(countries)   

#app main
if __name__ == "__main__":
    
    app.run(host='0.0.0.0', port=8000, debug=False)