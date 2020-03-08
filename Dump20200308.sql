CREATE DATABASE  IF NOT EXISTS `ofip` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ofip`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: ofip
-- ------------------------------------------------------
-- Server version	5.7.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `figura`
--

DROP TABLE IF EXISTS `figura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `figura` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caminho` varchar(255) CHARACTER SET utf8 NOT NULL,
  `noticia` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `noticia_idx` (`noticia`),
  CONSTRAINT `noticia` FOREIGN KEY (`noticia`) REFERENCES `noticia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `figura`
--

LOCK TABLES `figura` WRITE;
/*!40000 ALTER TABLE `figura` DISABLE KEYS */;
/*!40000 ALTER TABLE `figura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fonte`
--

DROP TABLE IF EXISTS `fonte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `fonte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fonte` varchar(4000) CHARACTER SET utf8 NOT NULL,
  `veiculo` int(11) NOT NULL,
  `palavra_chave` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `veiculo_fk1_idx` (`veiculo`),
  KEY `palavra_chave_fk1_idx` (`palavra_chave`),
  CONSTRAINT `palavra_chave_fk2` FOREIGN KEY (`palavra_chave`) REFERENCES `palavra_chave` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `veiculo_fk1` FOREIGN KEY (`veiculo`) REFERENCES `veiculo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fonte`
--

LOCK TABLES `fonte` WRITE;
/*!40000 ALTER TABLE `fonte` DISABLE KEYS */;
INSERT INTO `fonte` VALUES (1,'http://www.inpi.gov.br/noticias/inpi-sedia-encontro-dos-escritorios-de-pi-do-brics-em-2020',2,1),(2,'https://www.gazetadopovo.com.br/republica/breves/bolsonaro-declara-operacao-de-garantia-da-lei-e-da-ordem-devido-a-cupula-dos-brics-e-stf-suspende-trabalhos/',1,1),(3,'https://mundo.sputniknews.com/entrevistas/202002271090615064-argentina-espera-la-ayuda-de-rusia-para-ingresar-en-los-brics/',6,1),(4,'http://www.ultimasnoticias.com.ve/noticias/mundo/argentina-espera-la-ayuda-de-rusia-para-ingresar-en-los-brics/',5,1),(5,'https://www.udop.com.br/noticia/2020/01/17/o-brasil-estaria-trocando-o-mercosul-argentina-pelos-brics-india-y.html',3,1),(6,'https://elordenmundial.com/que-ha-sido-de-los-brics/',8,1),(7,'https://portal.fgv.br/noticias/novo-livro-compara-normas-combate-corrupcao-brics',4,1),(8,'https://www.df.cl/noticias/reportajes/adios-a-los-bric/2020-02-27/163956.html',9,1),(9,'http://www.emescam.br/abertas-inscricoes-para-pesquisas-no-ambito-dos-brics/',7,1),(10,'https://radiocooperativa.com.ar/alicia-castro-espero-que-rusia-ayude-a-la-argentina-a-ingresar-al-brics/',14,1),(11,'https://www.defesa.tv.br/os-brics-e-o-crescimento-economico-para-um-futuro-inovador/',10,1),(12,'https://economia.uol.com.br/noticias/bloomberg/2020/02/28/dobra-numero-de-candidatos-do-bric-para-visto-de-ouro-britanico.htm',13,1),(13,'https://es.noticias.yahoo.com/solicitudes-bric-visado-oro-brit%C3%A1nico-103642678.html',11,1),(14,'https://www.boliviaentusmanos.com/noticias/internacional/357364/argentina-espera-la-ayuda-de-rusia-para-ingresar-en-los-brics.html',12,1),(15,'http://www.comercio.gob.es/es-es/noticias/Paginas/2019-cierra-con-una-mejora-general-de-la-competitividad-precio-de-la-econom%C3%ADa-espa%C3%B1ola-.aspx?nav=/es-ES/comercio-exterior/noticias&titulo=2019%20cierra%20con%20una%20mejora%20general%20de%20la%20competitividad%20precio%20de%20la%20econom%C3%ADa%20espa%C3%B1ola',15,1),(18,'https://www.fundspeople.com/news/mercados-emergentes-china-ya-no-es-parte-del-bric',16,1),(19,'https://economia.estadao.com.br/noticias/geral,brasil-paga-dividas-com-onu-e-banco-do-brics,70003122847',17,1),(20,'https://www.saude.gov.br/noticias/agencia-saude/46184-tuberculose-abertas-inscricoes-para-pesquisas-no-ambito-dos-brics',19,1),(21,'https://valor.globo.com/brasil/noticia/2019/12/23/banco-do-brics-aprova-1a-operacao-de-private-equity-no-pais.ghtml',20,1),(22,'https://www1.folha.uol.com.br/mercado/2019/11/governo-negocia-credito-para-pagar-us-500-milhoes-ao-banco-dos-brics.shtml',18,1),(23,'https://gauchazh.clicrbs.com.br/ultimas-noticias/tag/brique-da-redencao/',21,1),(24,'http://www.agricultura.gov.br/noticias/carta-de-bonito-reafirma-compromisso-de-paises-do-brics-com-inovacao-e-sustentabilidade-na-agricultura',26,1),(25,'http://trabalho.gov.br/noticias/7244-principal-para-link-do-banner',23,1),(26,'https://www.dw.com/es/china-lidera-la-cumbre-de-los-brics/av-51256050',24,1),(27,'https://www.telesurtv.net/news/vladimir-putin-cumbre-brics-brasil-20191113-0022.html',22,1),(28,'https://www.dw.com/es/china-lidera-la-cumbre-de-los-brics/av-51259576',24,1),(29,'http://agenciabrasil.ebc.com.br/es/internacional/noticia/2019-11/brasil-entrega-presidencia-del-brics-habla-de-innovacion',25,1),(30,'http://fapesq.rpp.br/fapesq-fundacao-de-apoio-a-pesquisa-do-estado-da-paraiba',27,1),(31,'http://www.agricultura.gov.br/noticias/brics-precisa-enfrentar-tendencias-ao-protecionismo',26,1),(32,'https://www.lavozdegalicia.es/noticia/mercados/2020/01/05/nuevos-partenaires-mapa-mundial-brics-ticks/0003_202001SM5P7991.htm',28,1),(33,'https://www.fnlondon.com/articles/the-decade-the-brics-crumbled-and-whats-next-20200127',31,1),(34,'https://www.pymnts.com/news/international/2019/brics-drives-mobile-payments-growth-last-decade/',30,1),(35,'https://thediplomat.com/2020/01/confucius-institutes-in-brazil-and-brics-education-cooperation/',32,1),(36,'https://spacewatch.global/2019/12/brics-member-states-negotiating-earth-observation-satellite-sharing-framework/',29,1),(37,'https://www.indianweb2.com/2020/03/01/brics-cci-announces-launch-of-brics-cci-womena%c2%80%c2%99s-wing-to-create-an-enabling-support-system-for-women-entrepreneurs-and-professionals-across-geographies/',33,1),(38,'https://blogs.lse.ac.uk/usappblog/2020/02/16/book-review-russia-brics-and-the-disruption-of-global-order-by-rachel-s-salzman/',36,1),(39,'https://economictimes.indiatimes.com/small-biz/sme-sector/brics-cci-starts-womens-wing-to-support-entrepreneurs-and-professionals/articleshow/74395013.cms',35,1),(40,'https://m.economictimes.com/news/international/world-news/china-welcomes-support-from-brics-to-its-efforts-to-combat-coronavirus/articleshow/74101214.cms',34,1),(41,'https://www.linkedin.com/company/brics-chamber-of-commerce-&-industry',37,1),(42,'http://www.defesanet.com.br/brics/noticia/35548/BR-IN---Brasil-vai-assinar-dois-acordos-de-defesa-com-a-India--diz-secretario/',38,1),(43,'https://br.sputniknews.com/mundo/2020022715271022-brasil-vai-a-moscou-atras-de-resultados-concretos-em-reuniao-dos-brics/',39,1),(44,'http://www.defesanet.com.br/brics/noticia/35564/Brasil-e-India-assinam-acordos-bilaterais--incluindo-bioenergia-e-seguranca-cibernetica/',38,1),(45,'https://www.moneytimes.com.br/bric-numero-de-candidatos-para-visto-de-ouro-britanico-duplica/',41,1),(46,'http://sudema.pb.gov.br/fapesq/fapesq-fundacao-de-apoio-a-pesquisa-do-estado-da-paraiba',40,1),(47,'https://www.brasil247.com/blog/o-joguete-de-trump-contra-os-brics',42,1),(48,'https://www.correiobraziliense.com.br/app/noticia/opiniao/2020/02/20/internas_opiniao,829236/artigo-cade-brics-e-a-economia-digital.shtml',43,1),(49,'https://canaltech.com.br/ciencia/olimpiada-quer-unir-estudantes-dos-brics-em-conhecimentos-de-tecnologia-156601/',44,1),(50,'https://br.sputniknews.com/economia/2020022715271022-brasil-vai-a-moscou-atras-de-resultados-concretos-em-reuniao-dos-brics/',39,1),(51,'https://www.bol.uol.com.br/noticias/2020/02/28/dobra-numero-de-candidatos-do-bric-para-visto-de-ouro-britanico.htm',45,1),(52,'http://www.portaldaindustria.com.br/eventos/pt/edicoes/conselho-empresarial-brics-xi-edicao?v=f&c=CNI&p=2312127&t=publica-base-fluida.html',46,1),(53,'https://www.brasil247.com/brasil/lula-interesse-dos-eua-com-petroleo-foi-a-razao-de-quase-todos-os-conflitos-dos-seculos-20-e-21-q9jaobro',42,1),(54,'http://www.portaldaindustria.com.br/eventos/pt/edicoes/conselho-empresarial-brics-xi-edicao?p=1908022&c=CNI&t=publica-base-fluida.html&v=f',46,1),(55,'https://br.sputniknews.com/opiniao/2020030415292146-lideranca-brasileira-na-america-do-sul-era-inconveniente-para-os-eua-diz-especialista/',39,1);
/*!40000 ALTER TABLE `fonte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `noticia`
--

DROP TABLE IF EXISTS `noticia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `noticia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) CHARACTER SET utf8 NOT NULL,
  `texto` text CHARACTER SET utf8 NOT NULL,
  `fonte` int(11) NOT NULL,
  `data` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fonte_idx` (`fonte`),
  CONSTRAINT `fonte` FOREIGN KEY (`fonte`) REFERENCES `fonte` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noticia`
--

LOCK TABLES `noticia` WRITE;
/*!40000 ALTER TABLE `noticia` DISABLE KEYS */;
/*!40000 ALTER TABLE `noticia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `palavra_chave`
--

DROP TABLE IF EXISTS `palavra_chave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `palavra_chave` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor` varchar(45) CHARACTER SET utf8 NOT NULL,
  `projeto` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `palavra_UNIQUE` (`valor`),
  KEY `projeto_fk_idx` (`projeto`),
  CONSTRAINT `projeto_fk` FOREIGN KEY (`projeto`) REFERENCES `projeto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `palavra_chave`
--

LOCK TABLES `palavra_chave` WRITE;
/*!40000 ALTER TABLE `palavra_chave` DISABLE KEYS */;
INSERT INTO `palavra_chave` VALUES (1,'BRICS',2);
/*!40000 ALTER TABLE `palavra_chave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissao`
--

DROP TABLE IF EXISTS `permissao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `permissao` (
  `id` int(11) NOT NULL,
  `leitura` tinyint(4) NOT NULL,
  `escrita` tinyint(4) NOT NULL,
  `todos` tinyint(4) NOT NULL,
  `perfil` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissao`
--

LOCK TABLES `permissao` WRITE;
/*!40000 ALTER TABLE `permissao` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto`
--

DROP TABLE IF EXISTS `projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `projeto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto`
--

LOCK TABLES `projeto` WRITE;
/*!40000 ALTER TABLE `projeto` DISABLE KEYS */;
INSERT INTO `projeto` VALUES (1,'Pesquisa de esportes'),(2,'Observatório de Notícias Políticas'),(3,'Centro de pesquisa de educação');
/*!40000 ALTER TABLE `projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cpf` varchar(14) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(60) NOT NULL,
  `permissao` int(11) NOT NULL,
  `projeto` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `permissao_fk0_idx` (`permissao`),
  KEY `projeto_fk0_idx` (`projeto`),
  CONSTRAINT `permissao_fk0` FOREIGN KEY (`permissao`) REFERENCES `permissao` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `projeto_fk0` FOREIGN KEY (`projeto`) REFERENCES `projeto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veiculo`
--

DROP TABLE IF EXISTS `veiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `veiculo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veiculo`
--

LOCK TABLES `veiculo` WRITE;
/*!40000 ALTER TABLE `veiculo` DISABLE KEYS */;
INSERT INTO `veiculo` VALUES (1,'www.gazetadopovo.com.br'),(2,'www.inpi.gov.br'),(3,'www.udop.com.br'),(4,'portal.fgv.br'),(5,'www.ultimasnoticias.com.ve'),(6,'mundo.sputniknews.com'),(7,'www.emescam.br'),(8,'elordenmundial.com'),(9,'www.df.cl'),(10,'www.defesa.tv.br'),(11,'es.noticias.yahoo.com'),(12,'www.boliviaentusmanos.com'),(13,'economia.uol.com.br'),(14,'radiocooperativa.com.ar'),(15,'www.comercio.gob.es'),(16,'www.fundspeople.com'),(17,'economia.estadao.com.br'),(18,'www1.folha.uol.com.br'),(19,'www.saude.gov.br'),(20,'valor.globo.com'),(21,'gauchazh.clicrbs.com.br'),(22,'www.telesurtv.net'),(23,'trabalho.gov.br'),(24,'www.dw.com'),(25,'agenciabrasil.ebc.com.br'),(26,'www.agricultura.gov.br'),(27,'fapesq.rpp.br'),(28,'www.lavozdegalicia.es'),(29,'spacewatch.global'),(30,'www.pymnts.com'),(31,'www.fnlondon.com'),(32,'thediplomat.com'),(33,'www.indianweb2.com'),(34,'m.economictimes.com'),(35,'economictimes.indiatimes.com'),(36,'blogs.lse.ac.uk'),(37,'www.linkedin.com'),(38,'www.defesanet.com.br'),(39,'br.sputniknews.com'),(40,'sudema.pb.gov.br'),(41,'www.moneytimes.com.br'),(42,'www.brasil247.com'),(43,'www.correiobraziliense.com.br'),(44,'canaltech.com.br'),(45,'www.bol.uol.com.br'),(46,'www.portaldaindustria.com.br');
/*!40000 ALTER TABLE `veiculo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-08 20:29:04
