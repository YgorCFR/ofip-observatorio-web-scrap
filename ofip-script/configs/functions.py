#General functions
from configs import db as _
from configs import logs as log
from configs import api
import json
import pandas as pd
import time
from datetime import datetime, timedelta


def list_desired_values(query):
    execution = _.connection.execute(query)
    result = execution.fetchall()
    result = [str(i).replace("(", "").replace(",)", "").replace("'","") for i in result]
    return result

def id_per_value(values, key, column):
    id_of_values = []
    for value in values:
        r = list_desired_values(_.db.select([key]).where(column == value))
        id_of_values.append(r[0])
    
    id_of_values = [int(i) for i in id_of_values]
    sites_id = pd.DataFrame({'Site_ID': id_of_values})
    return sites_id

def turn_df_column_to_list(column):
    column = [i for i in set(list(column))]
    return column

def turn_df_column_to_list_repeatable(column):
    column =  [i for i in list(column)]
    return column

def wipe_ambiguity_lists(db, df):
    for item in db:
        if item in df:
            df.remove(item)
    return df


def combine_lists(arg1, arg2):
    combined = []
    for item in range(len(arg1)):
        combined.append([arg1[item], arg2[item]])
    return combined

def combine_three_lists(arg1, arg2, arg3):
    combined = []
    for item in range(len(arg1)):
        combined.append([arg1[item], arg2[item], arg3[item]])
    return combined

def save(table, content):
    data = []
    for i in content:
        columns = [str(i).replace(str(table) + ".", "") for i in table.columns]
        keys = columns
        columns.remove('id')
        if type(i) is list:
            columns = dict.fromkeys(columns)
            for item in range(len(i)):
                columns[keys[item]] = i[item]
        else:
            columns = dict.fromkeys(columns, i)
        data.append(columns)
    #print(data)
    query = _.db.insert(table)
    try:
        if not data:
            pass
        else:
            _.connection.execute(query, data)
    except Exception as e:
        print(e)
    # columns = [str(i).replace(str(table) + ".", "") for i in table.columns]
    # keys = columns
    # columns = dict.fromkeys(columns)
    # for i in range(len(keys)):
    #     print(columns[keys[i]])


def proccess_item(term, final, item, og_item):
    try:
        if (term[item][0:final] == term['pagemap']['metatags'][0][og_item][0:final]):
            return term['pagemap']['metatags'][0][og_item]
        else:
            return term[item]
    except:
        try:
            #print(term[item])
            return term[item]
        except:
            pass

def proccess_keyword(keyword_analysed):
    keyword_analysed = keyword_analysed.strip()
    return int(keyword_analysed)

def proccess_date(date_analysed):
    try:
        date_analysed = date_analysed['pagemap']['metatags'][0]['article:published_time']
        return date_analysed
    except:
        return (datetime.today() - timedelta(days=int(api.daysBefore[1:]))).strftime("%Y-%m-%d %H:%M:%S")

def process_api_data(indexes=None,description=None, datePublish=None, title=None, url=None, source=None, keyword_id=None, data=None, columns=[]):
    #Defining empty DataFrame
    dfMain = pd.DataFrame()
    for indexItem in indexes:
        index = indexItem.split(',')
        response = api.google_search("{0} {1}".format(index[0],"noticias"), api.api_key, api.cse_id, api.daysBefore, api.language)
        dataResponse = json.dumps(response)
        responseFormatted = json.loads(dataResponse)
        result = responseFormatted['items']
        for item in range(len(result)):  
            description = proccess_item(result[item], 10, 'snippet', 'og:description')    
            datePublish = proccess_date(result[item])
            title = proccess_item(result[item], 5,'title', 'og:title')
            url = proccess_item(result[item], 10, 'link', 'og:url')
            source = proccess_item(result[item], 5,'displayLink', 'author')
            keyword_id = proccess_keyword(index[1].replace(")", ""))
            data.append([description, datePublish, title, url, source, keyword_id])
            

    df = pd.DataFrame(data, columns=columns)
    df = analysing_df_first_treatment(df)
    df = analysing_df_second_treatment(df)
    dfMain = dfMain.append(df)
    dfMain.reset_index(drop=True)
    return dfMain

def analysing_df_first_treatment(df):
    dfSource = df
    dfTemp = df
    dfTemp['Url2'] = dfTemp['Url']
    dfTemp['Url'] = dfTemp['Url'].apply(lambda x: x.replace("http://","").replace("https://",""))
    dfTemp['Source'] = dfTemp['Source'].apply(lambda x: '{0}/'.format(x))
    dfTemp = dfTemp[(dfTemp['Url'].str.len() != dfTemp['Source'].str.len())]
    dfTemp['Source'] = dfTemp['Source'].apply(lambda x: x.replace("/", ""))
    dfTemp = dfTemp[(dfTemp['Url'].str.len() != dfTemp['Source'].str.len())]
    df['Source'] = dfTemp['Source']
    df  = df.dropna()
    df['Url'] = df['Url2']
    del df['Url2']
    return df

def wiping_df_from_existing_data(df, list_, column, value):
    df = df[df[column].isin(list_) == value]
    return df

def analysing_df_second_treatment(df):
    def f(x):
        x['Pos-Url'] = x['Pos-Url'][len(x['Source']):]
        return x['Pos-Url']
     
    dfSource = df
    with open("configs/unwanted.json", encoding="utf-8") as file:
        data = json.load(file)
        dfSource = dfSource[dfSource['Source'].isin(list(data['uwanted_sites_names'])) != True]
        print(dfSource['Url'])
        dfSource['Pos-Url'] = dfSource['Url'].apply(lambda x: x.replace('http://', '').replace('https://', ''))
        dfSource['Pos-Url'] = dfSource.apply(f, axis=1)
        dfSource = dfSource[dfSource['Pos-Url'].str.count('-') >= 5]
        dfSource = dfSource.reset_index(drop=True)
        df = dfSource
        del df['Pos-Url']
        return df

def wipe_duplicate_rows(df, subset):
    df = df.drop_duplicates(subset= subset, keep='first')
    return df

def append_the_news_to_dataframe(df, news_data):
    if len(news_data) > 0:    
        df = df.assign(News=pd.Series(news_data).values)
        df = df[df["News"] != 'N/D']
        return df
    else:
        log.logger.warning("Script encerrado por falta de dados de notícia.")
        exit(1)