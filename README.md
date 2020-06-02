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
 - [X] Done the news crud.
 - [X] Done the report xls and txt news exportation.
 - [ ] Implement the filters of projects, information vehicles and keywords filters.
 - [ ] Implement the pagination count.
 - [ ] Testing the API with a Single Page Application.



#What this software already does?
- Can extract from google's search engine a list of results that contains urls, titles, published dates and the domain of the searched sites of a given list of keywords.
- Can use the extracted list of urls and access 70 different sites that can be in this extract list and scrap and clean the news text of them. (These 70 sites can be more if the json file that they are stored be filled with more informations, following the correct pattern of the file).
- Can store the text of the extract news at database.
- Can provide a json response of the news with different kind of filters.
- Users can also delete, create and update news.
- Can export the filtered news to excel reports or formatted txt reports.
