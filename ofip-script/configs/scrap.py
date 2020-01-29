from selenium import webdriver
from bs4 import BeautifulSoup
import json
import os

op = webdriver.ChromeOptions()
op.add_argument('headless')
op.add_argument('log-level=3')
driver = webdriver.Chrome("chromedriver.exe", options=op)


# # url = 'https://www.sulbahianews.com.br/abertas-as-inscricoes-para-selecao-de-projetos-de-pesquisa-contra-a-tuberculose/'
# # with open("webSitesInfo.json") as file:
# #     data = json.load(file)
# #     for sites in data['sites']:
# #         if url.__contains__(sites['name']):



# driver.get('https://www.gazetadopovo.com.br/republica/breves/bolsonaro-declara-operacao-de-garantia-da-lei-e-da-ordem-devido-a-cupula-dos-brics-e-stf-suspende-trabalhos/')

# content = driver.page_source

# soup = BeautifulSoup(content, features='lxml')


# # def initialize_scrap(url):
# #     destination_to_scrap = driver.get(url)


# # def scrap_web_site():

# '''FONTE 3'''
# texto = ''
# for a in soup.findAll('div', attrs={'class': 'c-body'}):
#     texto = texto + str(a.find('p'))

# texto = texto.split('</p>')
# print(texto)   

# '''FONTE 2'''
# # texto = ''
# # for a in soup.findAll('p', attrs={'style': 'text-align: justify;'}):
# #     texto = texto + str(a)

# # texto = texto.replace("<p style=\"text-align: justify;\">", "").replace("</p>","")
# # print(texto)

# driver.get('https://g1.globo.com/rj/rio-de-janeiro/noticia/2020/01/20/witzel-diz-acreditar-que-a-situacao-da-cedae-foi-sabotagem.ghtml')
# driver.get('https://valor.globo.com/financas/noticia/2020/01/27/aversao-ao-risco-com-coronavirus-derruba-bolsa-e-leva-dolar-a-r-422.ghtml')
# driver.get('https://oglobo.globo.com/sociedade/saude/coronavirus-que-se-sabe-ate-agora-24204619')
# driver.get('https://brasil.elpais.com/internacional/2020-01-26/china-avisa-que-a-capacidade-de-contagio-do-coronavirus-se-torna-mais-forte.html')
content = driver.page_source

soup = BeautifulSoup(content, features='lxml')

# ''' FONTE 4 ''' # g1.globo.com #valor.globo.com/ 
# texto = ''
# try:
#     for a in soup.findAll('p', attrs={'class': 'content-text__container'}):
#         texto = texto + str(a)
#     texto = texto.replace("<p class=\"content-text__container\" data-track-category=\"Link no Texto\" data-track-links=\"\">", "").replace("</p>", "").replace("<p class=\"content-text__container\">","").replace("<a>","").replace("</a>","")
#     if texto.count('<p class=\"content-text__container theme-color-primary-first-letter" data-track-category="Link no Texto" data-track-links="">') > 0:
#         texto = texto.replace("<p class=\"content-text__container theme-color-primary-first-letter\" data-track-category=\"Link no Texto\" data-track-links=\"\">", "")
#     # texto = texto.replace(texto[texto.index('<a'):texto.index('ghtml\">')+ len('ghtml\">')], "")
#     while texto.__contains__('<a') == True:
#         texto = texto.replace(texto[texto.index('<a'):texto.index('ghtml\">')+ len('ghtml\">')], "")
#     while texto.__contains__('<em') == True:
#         texto = texto.replace(texto[texto.index('(<em'):texto.index('em>)')+ len('em>)')], "")
#     print(texto)
# except Exception as ex:
#     raise Exception(ex)

''' FONTE 5 '''  #brasil.elpais.com/
texto = ''
try:
    for a in soup.findAll('p', attrs={'class':''}):
        texto = texto + str(a)
    while texto.__contains__('<a') == True:
        texto = texto.replace(texto[texto.index('<a'):texto.index('_blank\">')+ len('_blank\">')], "")
    while texto.__contains__('</a>') == True:
        texto = texto.replace("</a>","")
    while texto.__contains__('<p') == True:
        texto = texto.replace(texto[texto.index('<p'):texto.index('class=\"\">')+ len('class=\"\">')], "")
    while texto.__contains__('</p>') == True:
        texto = texto.replace('</p>', "")
    print(texto)
except Exception as ex:
    raise Exception(ex)

# '''FONTE 1'''
# # r = str(soup).count('element ordem_')
# # texto = ''
# # for i in range(r-1):
# #     for a in soup.findAll('div', attrs={'class':'element ordem_' + str(i+1)}):
# #         ex = a.find('p')
# #         if i == 1:
# #             texto = texto + str(ex) 
# #         else:
# #             texto = str.format("{0}.{1}.", texto, str(ex))

# # texto = texto.replace("<p>","").replace("</p>","")
# # if (texto.count('.None..') > 0):
# #     texto = texto.replace(".None..","") 
# # print("\n")
# # print(texto)

