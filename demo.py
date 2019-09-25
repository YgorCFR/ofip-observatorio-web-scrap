# import pandas as pd

# content = pd.read_html("https://g1.globo.com/")
# print(content)

# import requests
# from bs4 import BeautifulSoup

# url = 'https://g1.globo.com/'
# r = requests.get(url)
# c = r.content
# soup1 = BeautifulSoup(c, 'html5lib')
# news = soup1.find_all('')
# print(news)

#importando bibliotecas
from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd

#configurando driver
driver = webdriver.Chrome("chromedriver.exe")

#setando titulo e texto da noticia
titulo = [] 
texto = []

#inicializando busca com o selenium
driver.get("https://g1.globo.com/busca/?q=brics")

#https://wradiobrasil.com/?s=brics&search=Search
#https://oglobo.globo.com/busca/?q=brics
#http://busca.ebc.com.br/?site_id=agenciabrasil&q=brics
#http://busca.ebc.com.br/sites/radioagencianacional/nodes?q=brics&op=Buscar
#https://sociologiaelementar.wordpress.com/?s=brics
#https://search.folha.uol.com.br/?q=brics&site=todos
#https://diplomatique.org.br/search/brics/
#https://www.bbc.co.uk/search?q=BRICs
#https://www.nytimes.com/search?query=brics
#https://www.gazetadopovo.com.br/busca/?q=brics
#https://www.correiodopovo.com.br/busca?q=brics



#preparando a pesquisa
content = driver.page_source
soup = BeautifulSoup(content)
for a in soup.findAll('ul', attrs={'class':'results__list'}):
    print(a)
