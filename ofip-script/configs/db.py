#Connecting with the database
import sys
sys.path.append('..')
#Using SQLAlchemy Object Relational Mapper (ORM)
import sqlalchemy as db
#Using mysql.connector to connect
import mysql.connector
#Plugging with mysql database
engine = db.create_engine('mysql+mysqlconnector://root:****@localhost:3306/ofip')
connection = engine.connect()

#Defining tables and their metadata from database
metadata = db.MetaData()
veiculo = db.Table('veiculo', metadata, autoload=True, autoload_with=engine)
figura = db.Table('figura', metadata, autoload=True, autoload_with=engine)
fonte = db.Table('fonte', metadata, autoload=True, autoload_with=engine)
noticia = db.Table('noticia', metadata, autoload=True, autoload_with=engine)
palavra_chave = db.Table('palavra_chave', metadata, autoload=True, autoload_with=engine)
projeto = db.Table('projeto', metadata, autoload=True, autoload_with=engine)


