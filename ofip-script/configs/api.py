#Setting google's custom search api keys
#API key
api_key = "AIzaSyAwQNFH---OsZBZ8mFdYLOlfTxzTbMmsb8"
#id cse
cse_id = "018325837677719991188:gtjiewtrkdm"
#import google search api module
from googleapiclient.discovery import build

#Defining paramters:
#parameter: daysBefore:
daysBefore = 'd2'
#parameter: language:
language = "lang_pt" 

#Using google search api function
def google_search(search_term, api_key, cse_id, period, lang,**kwargs):
    service = build("customsearch", "v1", developerKey=api_key)
    res = service.cse().list(q=search_term, cx=cse_id, dateRestrict=period, sort = 'date:d:s', lr=lang,
    **kwargs).execute()
    return res