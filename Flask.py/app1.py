# import sqlite3

# conn = sqlite3.connect('life_expectancy.db')
# c = conn.cursor()
# c.execute('SELECT * From life')
# data = c.fetchall()
# print(data)
# for row in data:
#     print(row)


import sqlite3

    
sqliteConnection = sqlite3.connect('life_expectancy.db')
cursor = sqliteConnection.cursor()
print("Connected to SQLite")
sqlite_select_query = """SELECT count(*) from life"""
cursor.execute(sqlite_select_query)
totalRows = cursor.fetchone()
print("Total rows are:  ", totalRows)
cursor.close()
