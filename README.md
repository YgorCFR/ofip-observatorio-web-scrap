# ofip-observatorio-web-scrap
# [More updates soon!]
The academic project "Observatório de Fontes de Informação Pública"(Public Informations Sources Observatory) a.k.a "ofip" or "piso" is a project
that observes sites and web sources around specifics kinds of informations, collectings news and articles by web scraping the web analysed web-sites.

##Stages:
1. Script Stage [Current]
2. Backend Stage
3. Front Stage

###Script Stage
 - The first stage: Make a script in Python to do the webscrap from the web sites, communicate with google's api and record the news at 
   a database.
 ####From the stage one (Script Stage)
 - [X] Build an primary ER model at database.
 - [X] Seed domain tables: "projetos", "palavra_chave".
 - [X] Do the script to connect with the Google's Custom Search API.
 - [X] Do the the json api response cleaning and treatment.
 - [X] Normalize the cleaned json with pandas.
 - [X] Save the base url's domain of the sites at database.
 - [X] Refactor all the project.
 - [X] Save the full url's of sites at database.
 - [X] Correcting bugs of the previous steps.
 - [X] Do the scraping of globo.com, valor.globo.com, elpais.com
 - [ ] Do the scraping script of another twenty seven sites.
 - [ ] Save the extracted text of the news at database.
 - [ ] Refactor previous steps.
