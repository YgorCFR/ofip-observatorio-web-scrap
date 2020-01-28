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
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `veiculo_fk1_idx` (`veiculo`),
  CONSTRAINT `veiculo_fk1` FOREIGN KEY (`veiculo`) REFERENCES `veiculo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fonte`
--

LOCK TABLES `fonte` WRITE;
/*!40000 ALTER TABLE `fonte` DISABLE KEYS */;
INSERT INTO `fonte` VALUES (1,'http://www.defesanet.com.br/brics/noticia/35546/India---Desfile-do-Dia-da-Republica-2020/',1),(2,'http://www.defesanet.com.br/brics/noticia/35548/BR-IN---Brasil-vai-assinar-dois-acordos-de-defesa-com-a-India--diz-secretario/',1),(3,'http://independenciasulamericana.com.br/2020/01/bolsonaro-copia-lula-e-prioriza-brics/',2),(4,'https://politica.estadao.com.br/blogs/fausto-macedo/a-incomoda-fotografia-da-corrupcao-no-brasil/',3),(5,'https://brasil.elpais.com/internacional/2020-01-26/china-avisa-que-a-capacidade-de-contagio-do-coronavirus-se-torna-mais-forte.html',8),(6,'https://g1.globo.com/ciencia-e-saude/noticia/2020/01/26/chegam-a-80-as-mortes-por-coronavirus-na-china.ghtml',4),(7,'https://oglobo.globo.com/sociedade/saude/coronavirus-que-se-sabe-ate-agora-24204619',10),(8,'https://exame.abril.com.br/ciencia/mapa-on-line-mostra-casos-do-coronavirus-da-china-pelo-mundo/',9),(9,'https://oglobo.globo.com/sociedade/saude/coronavirus-contagioso-antes-dos-sintomas-aparecerem-revela-ministro-chines-24212197',10),(10,'https://saude.estadao.com.br/noticias/geral,nao-e-uma-situacao-alarmante-diz-bolsonaro-sobre-coronavirus,70003173424',5),(11,'https://valor.globo.com/financas/noticia/2020/01/27/aversao-ao-risco-com-coronavirus-derruba-bolsa-e-leva-dolar-a-r-422.ghtml',7),(12,'https://www.infomoney.com.br/mercados/ibovespa-futuro-cai-forte-em-meio-a-disseminacao-do-coronavirus-dolar-sobe/',6),(13,'https://www.grandepremio.com.br/outras/noticias/fia-confirma-2-edicao-das-olimpiadas-do-automobilismo-em-2020-em-marselha',13),(14,'https://ipc.digital/seis-meses-ate-as-olimpiadas-de-toquio-2020/',14),(15,'https://www.sympla.com.br/mini-olimpiadas-tlc---2020__757703',11),(16,'https://valor.globo.com/mundo/noticia/2020/01/26/astro-do-basquete-kobe-bryant-morre-em-acidente-de-helicoptero-aos-41-anos.ghtml',7),(17,'https://www.sbs.com.au/language/portuguese/audio/bruno-soares-do-aberto-da-australia-para-as-olimpiadas-em-toquio-sera-a-ultima',15),(18,'https://sportbuzz.uol.com.br/noticias/futebol/cruzeiro-apresenta-dois-novos-reforcos-para-temporada-2020.phtml',16),(19,'https://sportbuzz.uol.com.br/noticias/futebol/principal-contratacao-do-vasco-2020-german-cano-pede-calma-torcedores-e-cobra-salarios-em-dia.phtml',16),(20,'https://www.selecoes.com.br/plantao/suspensao-por-doping-tira-rafaela-silva-de-olimpiada/',12);
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
  `projeto` int(11) NOT NULL,
  `fonte` int(11) NOT NULL,
  `data` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `projeto_idx` (`projeto`),
  KEY `fonte_idx` (`fonte`),
  CONSTRAINT `fonte` FOREIGN KEY (`fonte`) REFERENCES `fonte` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `projeto` FOREIGN KEY (`projeto`) REFERENCES `projeto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `palavra_chave`
--

LOCK TABLES `palavra_chave` WRITE;
/*!40000 ALTER TABLE `palavra_chave` DISABLE KEYS */;
INSERT INTO `palavra_chave` VALUES (4,'BRICS',2),(5,'Coronavírus',2),(6,'Dólar',2),(7,'Olimpíadas 2020',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veiculo`
--

LOCK TABLES `veiculo` WRITE;
/*!40000 ALTER TABLE `veiculo` DISABLE KEYS */;
INSERT INTO `veiculo` VALUES (1,'www.defesanet.com.br'),(2,'independenciasulamericana.com.br'),(3,'politica.estadao.com.br'),(4,'g1.globo.com'),(5,'saude.estadao.com.br'),(6,'www.infomoney.com.br'),(7,'valor.globo.com'),(8,'brasil.elpais.com'),(9,'exame.abril.com.br'),(10,'oglobo.globo.com'),(11,'www.sympla.com.br'),(12,'www.selecoes.com.br'),(13,'www.grandepremio.com.br'),(14,'ipc.digital'),(15,'www.sbs.com.au'),(16,'sportbuzz.uol.com.br');
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

-- Dump completed on 2020-01-27 23:13:44
