import logging

logging.basicConfig(filename='../app.log', filemode='a+', format='[%(asctime)s]: %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("default logger")
