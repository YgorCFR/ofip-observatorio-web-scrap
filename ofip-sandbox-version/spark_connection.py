import os
from pyspark.sql import SQLContext
from pyspark import SparkContext
#os.environ['PYSPARK_SUBMIT_ARGS'] = '--jars /Users/adityaallamraju/hadoop-install/mysql-connector-java-5.1.45/mysql-connector-java-5.1.45-bin.jar  pyspark-shell'


sc = SparkContext(appName="TestPySparkJDBC")
sqlContext = SQLContext(sc)

#Provide your Spark-master node below
hostname = "127.0.0.1" 
dbname = "ofip"
jdbcPort = 3306
username = "root"
password = "750qwe700kxy@"
jdbc_url = "jdbc:mysql://{0}:{1}/{2}?user={3}&password={4}".format(hostname,jdbcPort, dbname,username,password)


query = "(select * from noticia) t1_alias"
df1 = sqlContext.read.format('jdbc').options(driver = 'com.mysql.jdbc.Driver',url=jdbc_url, dbtable=query ).load()
df1.show()