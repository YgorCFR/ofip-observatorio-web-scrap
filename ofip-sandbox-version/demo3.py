import requests

url = ('https://newsapi.org/v2/top-headlines?q=Brics&country=br&apiKey=de6d8e8d20b1418ba270d151097f48ea')
response = requests.get(url)
print(response.json())