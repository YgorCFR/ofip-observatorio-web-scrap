import mysql.connector as MySQLdb

host = "localhost"
user = "root"
passwd = "adm"
db = "ofip"

db = MySQLdb.connect(
  host= host,
  user= user,
  passwd= passwd,
  db = db
)