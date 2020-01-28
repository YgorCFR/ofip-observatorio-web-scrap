#importing google search api
from googleapiclient.discovery import build

#importing other essential libraries
from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import json
import ast
import time
from datetime import datetime, timedelta

#import the database connection file
import connections_db as d



c = d.db.cursor(dictionary=True)

def select(fields, tables, where=None):
    query = "select" + fields + " from " + tables
    if (where):
        query = query + " where " + where
    c.execute(query)
    return c.fetchall()

def insert(values, table, fields=None):
    query = "insert into" + table
    if (fields):
        query = query + " ( " + fields + ") "
    query = query + " values " + ",".join(["(" + v + ") " for v in values])
    print(query)
    d.db.commit()

def update(sets, table, where=None):
    query = " update " + table + " set " + ",".join([field + " = '" + value + "'" for field, value in sets.items()])
    if(where):
        query = query + " where " + where
    c.execute(query)
    d.db.commit()


def delete(table, where):
    query = "DELETE FROM " + table + " WHERE " + where
    c.execute(query)
    d.db.commit()
 



#API key
api_key = "*******"
#id cse
cse_id = "*******"
#parameter: daysBefore:
daysBefore = "d2"
#parameter: language:
language = "lang_pt"


def google_search(search_term, api_key, cse_id, period, lang,**kwargs):
    service = build("customsearch", "v1", developerKey=api_key)
    res = service.cse().list(q=search_term, cx=cse_id, dateRestrict=period, sort = 'date:r:yyyymmdd:yyyymmdd', lr=lang, 
    **kwargs).execute()
    return res

response = google_search("BRICS noticias", api_key, cse_id, daysBefore, language)
data = json.dumps(response)
responseFormatted = json.loads(data)
result = responseFormatted['items']
# f = open("resultado.json", "w")
# f.writelines(str(items['items']))

# driver.get(items['items'][2]['link'])

# content = driver.page_source
# soup = BeautifulSoup(content)
# for a in soup.findAll('p'):
#     print(a)

# f = open("resultado.json", "r")
# info = f.read()
# result = ast.literal_eval(info)

description = ''
datePublish = ''
title = ''
url = ''
source = ''
data = []
columns = ['Description', 'DatePublish', 'Title', 'Url', 'Source']
for item in range(len(result)):
    print("Descrição")
    try:
      if(result[item]['snippet'][0:10] == result[item]['pagemap']['metatags'][0]['og:description'][0:10]):
        print(result[item]['pagemap']['metatags'][0]['og:description'])
        description = result[item]['pagemap']['metatags'][0]['og:description']
      else:
        print(result[item]['snippet'])
        description = result[item]['snippet']
    except:
      print(result[item]['snippet'])
      description = result[item]['snippet']

    print("Data:")
    try:
        print(result[item]['pagemap']['metatags'][0]['article:published_time'])
        datePublish = result[item]['pagemap']['metatags'][0]['article:published_time']
    except:
        print((datetime.today() - timedelta(days=int(daysBefore[1:]))).strftime("%Y-%m-%d %H:%M:%S"))
        datePublish = (datetime.today() - timedelta(days=int(daysBefore[1:]))).strftime("%Y-%m-%d %H:%M:%S")       
    
    print("Titulo")
    try:
        if(result[item]['title'][0:5] == result[item]['pagemap'][0]['og:title'][0:5]):
            print(result[item]['pagemap'][0]['og:title'])
            title = result[item]['pagemap'][0]['og:title']
        else:
            print(result[item]['title'])
            title = result[item]['title']
    except:
        print(result[item]['title'])
        title = result[item]['title']

    print("URL")
    try:
        if (result[item]['link'][0:10] == result[item]['pagemap']['metatags'][0]['og:url'][0:10]):
            print(result[item]['pagemap'][0]['og:url'])
            url = result[item]['pagemap'][0]['og:url']
        else:
            print(result[item]['link'])
            url = result[item]['link']
    except:
        print(result[item]['link'])
        url = result[item]['link']

    print("Fonte:")
    try: 
        if (result[item]['displayLink'][0:5] == result[item]['pagemap']['metatags'][0]['author'][0:5]):
            print(result[item]['pagemap']['metatags'][0]['author'])
            source = result[item]['pagemap']['metatags'][0]['author']
        else:
            print(result[item]['displayLink'])
            source = result[item]['displayLink']
    except:
        print(result[item]['displayLink'])
        source = result[item]['displayLink']
    data.append([description, datePublish, title, url, source])
    print("\n\n")
print(result[8])

df = pd.DataFrame(data, columns=columns)
print(df)

# print("Descrição:")
# print(r[1]['pagemap']['metatags'][0]['og:description'])
# print("Data:")
# print(r[1]['pagemap']['metatags'][0]['article:published_time'])
# print("Título:")
# print(r[1]['pagemap']['metatags'][0]['og:title'])
# print("URL:")
# print(r[1]['pagemap']['metatags'][0]['og:url'])
# print("Fonte:")
# print(r[1]['pagemap']['metatags'][0]['og:site_name'])
# print("Autor:")
# print(r[1]['pagemap']['metatags'][0]['author'])
# print("\n\n")
# print("Descrição:")
# print(r[1]['pagemap']['metatags'][0]['og:description'])
# print("Data:")
# print(r[1]['pagemap']['metatags'][0]['article:published_time'])
# print("Título:")
# print(r[1]['pagemap']['metatags'][0]['og:title'])
# print("URL:")
# print(r[1]['pagemap']['metatags'][0]['og:url'])
# print("Fonte:")
# print(r[1]['pagemap']['metatags'][0]['og:site_name'])
# print("Autor:")
# print(r[1]['pagemap']['metatags'][0]['author'])
# print("\n\n")



    