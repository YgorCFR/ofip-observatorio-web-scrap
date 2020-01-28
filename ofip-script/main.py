from configs import db as _
from configs import api as api
from configs import functions as f
from configs import scrap as s
import pandas as pd

def main():
    #get palavras_chave
    key_words = f.list_desired_values(_.db.select([_.palavra_chave.columns.valor]))
    processed_data = f.process_api_data(key_words,'', '', '', '', '', [], ['Description', 'DatePublish', 'Title', 'Url', 'Source'])
    #print(processed_data['Url'])
    #get existing sources.
    get_list_of_db_sources = f.list_desired_values(_.db.select([_.veiculo.columns.site]))
    get_list_of_df_sources = f.turn_df_column_to_list(processed_data['Source'])

    #compare and save.
    final_list = f.wipe_ambiguity_lists(get_list_of_db_sources, get_list_of_df_sources)

    f.save(_.veiculo, final_list)


    #retrieving site's ids.
    sites_id = f.id_per_value(list(processed_data['Source']), _.veiculo.columns.id, _.veiculo.columns.site)
    processed_data['Site_ID'] = sites_id
    
    #drop duplicates to save the url's:
    wipe_df_duplicate_rows = f.wipe_duplicate_rows(processed_data, "Url")
    wipe_df = f.wiping_df_from_existing_data(wipe_df_duplicate_rows, f.list_desired_values(_.db.select([_.fonte.columns.fonte])), 'Url')

    #getting list of sources and saving url's.
    get_list_of_df_url = f.turn_df_column_to_list_repeatable(wipe_df['Url'])
    get_list_of_df_sites_id = f.turn_df_column_to_list_repeatable(wipe_df['Site_ID'])
    
    #saving url's
    f.save(_.fonte ,f.combine_lists(get_list_of_df_url, get_list_of_df_sites_id))    


if __name__ == "__main__":
    main()






 

