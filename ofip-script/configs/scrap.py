from selenium import webdriver
from bs4 import BeautifulSoup
import json
import os
import re
from xml.etree import ElementTree as etree
import pandas as pd


def prepare_scrap_configuration():
    op = webdriver.ChromeOptions()
    op.add_argument('headless')
    op.add_argument('log-level=3')
    driver = webdriver.Chrome("chromedriver.exe", options=op)
    

# # url = 'https://www.sulbahianews.com.br/abertas-as-inscricoes-para-selecao-de-projetos-de-pesquisa-contra-a-tuberculose/'
# # with open("webSitesInfo.json") as file:
# #     data = json.load(file)
# #     for sites in data['sites']:
# #         if url.__contains__(sites['name']):

def findItem(theList, item):
    return [(ind, theList[ind].index(item)) for ind in range(len(theList)) if item in theList[ind]]

def scrap(df):
    with open('configs/webSitesInfo.json', encoding="utf8") as file:
        data = json.load(file)
        # for sites in data['site_info']:
        #     for url in list_of_urls:
        #         if sites['name'] in url:
        #             print(sites['name'], url)
        web_sites_info = [[sites['name'], ind] for ind, sites in enumerate(data['site_info'])]
        
        for item in df.loc[:, ['Url', 'Source']].values.tolist():
            
            searched_site = None
            tag1 = '' 
            att = None
            att_value = None
            text_to_replace = []
            news_data = []

            if item[1] in [ i[0] for i in web_sites_info]:
                index_site = findItem(web_sites_info, item[1])
                searched_site = data['site_info'][index_site[0][0]]
                tag1 = searched_site['tag1']
                att = searched_site['attrs_?']['att']
                att_value = searched_site['attrs_?']['att_value']
                text_to_replace = searched_site['text_to_replace']
                # print(text_to_replace.sort(key = lambda x : x['replace_type']))
                result = run_scrap_script(searched_site, item[0])
                news_data.append(result)
        df = df.assign(News=pd.Series(news_data).values)
        print(df['News'])
def run_scrap_script(data, url):
    try:
        op = webdriver.ChromeOptions()
        op.add_argument('headless')
        op.add_argument('log-level=3')
        driver = webdriver.Chrome("chromedriver.exe", options=op)
        
        driver.get(url)
        
        content = driver.page_source
        soup = BeautifulSoup(content, features='lxml')
        conteudo_do_site = []
        texto = ''
        if data['attrs_?']['att_value'] != None:
            conteudo_do_site = soup.findAll(data['tag1'], attrs={ data['attrs_?']['att'] : data['attrs_?']['att_value']})
        else:
            conteudo_do_site = soup.findAll(data['tag1'])
        for conteudo in conteudo_do_site:
            texto = texto + str(conteudo)
        texto_bs = BeautifulSoup(texto, features="lxml")
        texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
        
        for text_item in data['text_to_replace']:
            if text_item['replace_type'] == 0:
                break
            
            if text_item['replace_type'] == 1:
                texto_bs_refinado = texto_bs_refinado.replace(texto_bs_refinado[texto_bs_refinado.index(text_item['start']):texto_bs_refinado.index(text_item['end']) + len(text_item['end'])],"")
            
            if text_item['replace_type'] == 2:
                texto_bs_refinado = texto_bs_refinado.replace(texto_bs_refinado[texto_bs_refinado.index(text_item['start']):],"")

            if text_item['replace_type'] == 3:
                texto_bs_refinado = texto_bs_refinado.replace(texto_bs_refinado[:texto_bs_refinado.index(text_item['end'])],"")
        return texto_bs_refinado
    except Exception as ex:
        raise ex

# driver.get('https://economia.uol.com.br/noticias/bloomberg/2020/02/28/dobra-numero-de-candidatos-do-bric-para-visto-de-ouro-britanico.htm')

# content = driver.page_source

# soup = BeautifulSoup(content, features='lxml')


# driver.get('https://www.gazetadopovo.com.br/republica/breves/bolsonaro-declara-operacao-de-garantia-da-lei-e-da-ordem-devido-a-cupula-dos-brics-e-stf-suspende-trabalhos/')

# op = webdriver.ChromeOptions()
# op.add_argument('headless')
# op.add_argument('log-level=3')
# driver = webdriver.Chrome("chromedriver.exe", options=op)

# driver.get('https://economia.uol.com.br/noticias/bloomberg/2020/02/28/dobra-numero-de-candidatos-do-bric-para-visto-de-ouro-britanico.htm')

# content = driver.page_source

# soup = BeautifulSoup(content, features='lxml')

# texto = ''
# conteudo_do_site = soup.findAll('div', attrs={'class' : 'text'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)


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
# ##driver.get('https://oglobo.globo.com/sociedade/saude/coronavirus-que-se-sabe-ate-agora-24204619')
# driver.get('https://brasil.elpais.com/internacional/2020-01-26/china-avisa-que-a-capacidade-de-contagio-do-coronavirus-se-torna-mais-forte.html')
# driver.get('http://agenciabrasil.ebc.com.br/internacional/noticia/2019-11/brasil-entrega-presidencia-do-brics-e-destaca-trabalho-em-inovacao')
# driver.get('http://defesanet.com.br/brics/noticia/35548/BR-IN---Brasil-vai-assinar-dois-acordos-de-defesa-com-a-India--diz-secretario/')
# driver.get('https://exame.abril.com.br/mercados/dolar-abre-estavel-apos-fechamento-em-recorde-maximo/')
# driver.get('http://www.rfi.fr/br/brasil/20191113-brics-tem-historico-de-superacao-de-divergencias-e-continua-relevante-segundo-analis')
# driver.get('http://www.itamaraty.gov.br/pt-BR/notas-a-imprensa/21083-declaracao-de-brasilia-11-cupula-do-brics')
# driver.get('https://br.sputniknews.com/economia/2020012015028854-russia-divulga-calendario-do-brics-para-2020-e-diz-que-bloco-e-navio-que-resiste-as-tempestades/')
# driver.get('https://www1.folha.uol.com.br/educacao/2020/02/apesar-de-decisao-batalha-judicial-sobre-o-sisu-continua.shtml')
# driver.get('https://noticias.uol.com.br/politica/ultimas-noticias/2020/02/06/em-meio-a-crise-da-agua-cpi-da-cedae-e-alvo-de-disputa-politica-no-rio.htm')
# driver.get('https://noticias.r7.com/saude/pesquisadores-reduzem-espera-por-diagnostico-de-coronavirus-para-3h-08022020')
# driver.get('https://www.gazetadopovo.com.br/republica/breves/justica-manda-rever-cinco-anos-de-financiamentos-da-universidade-brasil/')
# driver.get('https://www.saude.gov.br/saude-de-a-z/coronavirus')
# driver.get('https://theintercept.com/2020/01/21/a-crise-da-agua-no-rio-de-janeiro-e-a-necropolitica-pela-torneira/')
# driver.get('https://www.rtp.pt/noticias/mundo/coronavirus-espanha-confirma-segundo-caso-de-infecao_n1203960')
# driver.get('http://www.ufrpe.br/br/content/ufrpe-comunica-adiamento-da-primeira-convoca%C3%A7%C3%A3o-da-lista-de-espera-do-sisu')
# driver.get('http://www.bricspolicycenter.org/eventos/nest-latam-and-global-thinkers-meeting/')
# driver.get('https://www.uol.com.br/vivabem/noticias/redacao/2020/01/25/tire-suas-principais-duvidas-sobre-o-coronavirus-que-se-espalha-pelo-mundo.htm')
# driver.get('https://saude.estadao.com.br/noticias/geral,autoridades-de-toquio-negam-cancelamento-das-olimpiadas-por-causa-do-coronavirus,70003179695')
# driver.get('https://www.dw.com/pt-br/bolsonaro-defende-brasil-em-primeiro-lugar-na-c%C3%BApula-do-brics/a-51257897')
# driver.get('https://www.infomoney.com.br/mercados/ibovespa-futuro-cai-forte-em-meio-a-disseminacao-do-coronavirus-dolar-sobe/')
# driver.get('https://economia.estadao.com.br/noticias/geral,taxa-de-desemprego-fica-em-11-9-em-2019-no-melhor-resultado-em-tres-anos,70003180023')
# driver.get('https://www.nexojornal.com.br/expresso/2020/01/28/Quais-as-dimens%C3%B5es-pol%C3%ADticas-da-crise-h%C3%ADdrica-do-Rio')
# driver.get('https://www.diariodepernambuco.com.br/noticia/mundo/2020/02/antartica-registra-temperatura-recorde-acima-dos-20-c-diz-cientista.html')
# driver.get('https://br.noticias.yahoo.com/relator-deve-retirar-taxacao-de-segurodesemprego-da-mp-verdeamarela-213325192.html')
# driver.get('https://www.cartacapital.com.br/economia/desemprego-deixa-de-ser-melhor-dado-sobre-mercado-de-trabalho-diz-oit/')
# driver.get('https://www.poder360.com.br/internacional/mortos-por-coronavirus-na-china-ja-superam-os-da-epidemia-de-sars/')
# driver.get('http://www.inpi.gov.br/noticias/inpi-sedia-encontro-dos-escritorios-de-pi-do-brics-em-2020')
# driver.get('https://www.ufmg.br/sisu/wp-content/uploads/2020/02/1a-Chamada-da-LP-e-1%C2%AA-Antecipa%C3%A7%C3%A3o-Public%C3%A1vel.pdf')
# driver.get('https://thediplomat.com/2020/01/confucius-institutes-in-brazil-and-brics-education-cooperation/')
# driver.get('https://www.scientificamerican.com/article/how-coronaviruses-cause-infection-from-colds-to-deadly-pneumonia1/')
# driver.get('http://www.usp.br/internationaloffice/index.php/destaques/brics-universities-league-annual-forum-acontece-na-fea/')
# driver.get('https://www.greenpeace.org/brasil/blog/a-populacao-de-pinguins-esta-diminuindo')
# driver.get('http://www.abin.gov.br/pt/cupula-do-brics-e-acompanhada-pela-inteligencia/')
# driver.get('http://transportes.gov.br/ultimas-noticias/9281-minist%C3%A9rio-coloca-concess%C3%B5es-de-infraestrutura-no-foco-do-banco-do-brics.html')
# driver.get('https://www12.senado.leg.br/noticias/materias/2020/02/17/taxa-de-desemprego-deve-continuar-caindo-nos-proximos-meses-avalia-ifi')
 
''' FONTE 36 ''' #https://www12.senado.leg.br
# texto = ''
# conteudo_do_site = soup.findAll('div', attrs={'id' : 'textoMateria'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)

''' FONTE 35 ''' #http://transportes.gov.br
# texto  = ''
# conteudo_do_site = soup.findAll('div', attrs={'id' : 'article_fulltext'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)


''' FONTE 34 ''' #http://www.abin.gov.br/
# texto  = ''
# conteudo_do_site = soup.findAll('p')
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)


''' FONTE 33 ''' #https://www.greenpeace.org
# texto  = ''
# conteudo_do_site = soup.findAll('article', attrs={'class' : 'post-details clearfix'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)


''' FONTE 32 ''' #http://www.usp.br/
# texto  = ''
# conteudo_do_site = soup.findAll('div', attrs={'id' : 'content'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)


''' FONTE 31 ''' #https://www.scientificamerican.com
# texto  = ''
# conteudo_do_site = soup.findAll('div', attrs={'class' : 'mura-region-local'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)


''' FONTE 30 ''' # https://thediplomat.com/
# texto  = ''
# conteudo_do_site = soup.findAll('section', attrs={'class' : 'td-prose ng-scope'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)



''' FONTE 29 ''' #http://www.inpi.gov.br
# texto  = ''
# conteudo_do_site = soup.findAll('div', attrs={'property' : 'rnews:articleBody'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)

''' FONTE 28 ''' #https://www.poder360.com.br/
# texto  = ''
# conteudo_do_site = soup.findAll('p')
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# if texto_bs_refinado.__contains__('Poder360 enviar'):
#     while texto_bs_refinado.__contains__('Poder360 enviar'):
#         texto_bs_refinado = texto_bs_refinado.replace(texto_bs_refinado[texto_bs_refinado.index('Poder360 enviar'):],"")
# print(texto_bs_refinado)

''' FONTE 27 ''' #https://www.cartacapital.com.br
# texto  = ''
# conteudo_do_site = soup.findAll('div', attrs={'class': 'eltdf-post-text-inner clearfix'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)


''' FONTE 26 ''' #https://br.noticias.yahoo.com
# texto  = ''
# conteudo_do_site = soup.findAll('p', attrs={'class': 'canvas-atom canvas-text Mb(1.0em) Mb(0)--sm Mt(0.8em)--sm'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)

''' FONTE 25 '''
# texto = '' #https://www.diariodepernambuco.com.br
# conteudo_do_site = soup.findAll('div', attrs={'class': 'news_body'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# if texto_bs_refinado.__contains__('Add'):
#     while texto_bs_refinado.__contains__('Add'):
#         texto_bs_refinado = texto_bs_refinado.replace(texto_bs_refinado[texto_bs_refinado.index('Add'):], "")
# print(texto_bs_refinado)


''' FONTE 9 ''' # http://www.defesanet.com.br
# texto = ''
# conteudo_do_site = soup.findAll('p')
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)



# ''' FONTE 10 ''' # http://www.itamaraty.gov.br
# texto = ''
# conteudo_do_site = soup.findAll('p', attrs={'style': 'text-align: justify;'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto)
# texto_bs_refinado = texto_bs.get_text()
# print(texto_bs_refinado)

# ''' FONTE 11 ''' #https://br.sputniknews.com
# texto = ''
# conteudo_do_site = soup.findAll('div', attrs={'class':'b-article__text'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = texto_bs.get_text()
# print(texto_bs_refinado)

# ''' FONTE 12 ''' #https://www1.folha.uol.com.br
# texto = ''
# conteudo_do_site = soup.findAll('div', attrs={'class','c-news__content'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo.text)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())

# if texto_bs_refinado.__contains__('ic_share') and texto_bs_refinado.__contains__('Copiar link Ícone fechar') and texto_bs_refinado.__contains__('Facebook WhatsApp Twitter'): 
#     texto_bs_refinado = texto_bs_refinado.replace(texto_bs_refinado[texto_bs_refinado.index('ic_share'):texto_bs_refinado.index('Copiar link Ícone fechar') + len('Copiar link Ícone fechar')],"").replace(texto_bs_refinado[texto_bs_refinado.index('Facebook WhatsApp Twitter'):],"")
# print(texto_bs_refinado)


''' FONTE 13 ''' # https://noticias.uol.com.br
# texto = ''
# conteudo_do_site = soup.findAll('div', attrs={'class': 'text has-image'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)

''' FONTE 14 '''  # https://noticias.r7.com/
# texto = ''
# conteudo_do_site = soup.findAll('article', attrs={'class' : 'content'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)

# ''' FONTE 15 ''' # https://www.gazetadopovo.com.br
# texto = ''
# conteudo_do_site = soup.findAll('p', attrs={'tabindex': '0'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)

# ''' FONTE 16 ''' # https://www.saude.gov.br
# texto = ''
# conteudo_do_site = soup.findAll('p')
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# if texto_bs_refinado.__contains__('Clique aqui'):
#     texto_bs_refinado = texto_bs_refinado.replace(texto_bs_refinado[texto_bs_refinado.index('Clique aqui'):], "")
# print(texto_bs_refinado)


# ''' FONTE 17 ''' # https://theintercept.com 
# texto = ''
# conteudo_do_site = soup.findAll('div', attrs={'class': 'PostContent'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)

# ''' FONTE 18 ''' # https://www.rtp.pt
# texto = ''
# conteudo_do_site = soup.findAll('section', attrs={'class': 'article-body'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# if texto_bs_refinado.__contains__('00:00') and texto_bs_refinado.__contains__('();'):
#     while texto_bs_refinado.__contains__('00:00') and texto_bs_refinado.__contains__('();'):
#         texto_bs_refinado = texto_bs_refinado.replace(texto_bs_refinado[texto_bs_refinado.index('00:00'):texto_bs_refinado.index('();') + len('();')],"")
# print(texto_bs_refinado)


# ''' FONTE 19 ''' #http://www.ufrpe.br
# texto = ''
# conteudo_do_site = soup.findAll('div', attrs={'class': 'field-item even'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)

# ''' FONTE 20 ''' #http://www.bricspolicycenter.org
# texto = ''
# conteudo_do_site = soup.findAll('div', attrs={'class': 'tribe-events-single-event-description tribe-events-content'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)

# ''' FONTE 21 ''' #www.uol.com.br
# texto = ''
# conteudo_do_site = soup.findAll('div', attrs={'class': 'text'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)


# ''' FONTE 22 '''  #https://saude.estadao.com.br
# texto = ''
# conteudo_do_site = soup.findAll('div', attrs={'class': 'n--noticia__content content'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)

# ''' FONTE 23 ''' # https://www.dw.com/
# texto = ''
# conteudo_do_site = soup.findAll('div', attrs={'class': 'longText'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)

# ''' FONTE 24 ''' # https://www.infomoney.com.br
# texto = ''
# conteudo_do_site = soup.findAll('p')
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# if texto_bs_refinado.__contains__(' – '):
#     while texto_bs_refinado.__contains__(' – '):
#         texto_bs_refinado = texto_bs_refinado.replace(texto_bs_refinado[: texto_bs_refinado.index(' – ') + len(' – ')],"")
#         break
# print(texto_bs_refinado)


# ''' FONTE 25 '''  #https://economia.estadao.com.br
# texto = ''
# conteudo_do_site = soup.findAll('div', attrs={'class': 'n--noticia__content content'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)

# ''' FONTE 26 ''' #https://www.nexojornal.com.br
# texto = ''
# conteudo_do_site = soup.findAll('div', attrs={'class':'Default__text-area___38Dm5'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# if texto_bs_refinado.__contains__('Saiba mais.'):
#     texto_bs_refinado = texto_bs_refinado.replace(texto_bs_refinado[texto_bs_refinado.index('Saiba mais.'):],"")
# print(texto_bs_refinado)

''' FONTE 27 ''' 

# ''' FONTE 8 ''' # http://www.rfi.fr/br/
# texto = ''
# conteudo_do_site = soup.findAll('p')
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)


# ''' FONTE 7 ''' #https://exame.abril.com.br
# texto = ''
# conteudo_do_site = soup.findAll('p', attrs={'class':''})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)


# ''' FONTE 4 ''' # g1.globo.com #valor.globo.com/ 
# texto = ''
# conteudo_do_site = soup.findAll('p', attrs={'class':'content-text__container'})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)



# ''' FONTE 5 '''  #brasil.elpais.com/
# texto = ''
# conteudo_do_site = soup.findAll('p', attrs={'class':''})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)


# ''' FONTE 6 ''' #http://agenciabrasil.ebc.com.br/
# texto = ''
# conteudo_do_site = soup.findAll('p', attrs={'class':''})
# for conteudo in conteudo_do_site:
#     texto = texto + str(conteudo)
# texto_bs = BeautifulSoup(texto, features="lxml")
# texto_bs_refinado = re.sub('\s+', ' ', texto_bs.get_text())
# print(texto_bs_refinado)


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

