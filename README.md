# ofip-observatorio-web-scrap
# [More updates soon!]
The academic project "Observatório de Fontes de Informação Pública"(Public Informations Sources Observatory) a.k.a "ofip" or "piso" is a project
that observes sites and web sources around specifics kinds of informations, collectings news and articles by web scraping the web analysed web-sites.

##Stages:
1. Script Stage [DONE] - [TESTING AND LOOKING FOR POSSIBLE BUGS]
2. Backend Stage [Current]
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
 - [X] Do the scraping of globo.com, valor.globo.com, elpais.com, etc
 - [X] Do the scraping script of another 70 sites. [A json file was made to enter the wanted sites, if a person mind to add more sites she/he needs only to fill this file with the correct parameters and let the script made the rest of the work].
 - [X] Save the extracted text of the news at database.
 - [X] Refactor previous steps.
 
 ###From the stage two (API Stage)
 - [X] Add the models.
 - [X] Done the relationships
 - [X] Configured JWT 
 - [X] Configured Https
 - [X] Configured Redis
 - [X] Done User Management services (Login, Logout, Permission with RBAC at middlewares, Password recovery);
 - [X] Done the password recovery interfaces in pug.
 - [ ] Implement the other functionalities(news crud, historic, reports exportation). 
