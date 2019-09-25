from googleapiclient.discovery import build
import pandas as pd


#chave da API
api_key = "*******"
#id do mecanismo de pesquisa
cse_id = "*******"

def google_search(search_term, api_key, cse_id, **kwargs):
    service = build("customsearch", "v1", developerKey=api_key)
    res = service.cse().list(q=search_term, cx=cse_id, **kwargs).execute()
    return res

result = google_search("BRICS", api_key, cse_id)
print(result)


