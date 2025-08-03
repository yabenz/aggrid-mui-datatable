-- MySQL dump 10.13  Distrib 8.0.43, for macos15 (x86_64)
--
-- Host: localhost    Database: cars
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `EVehicles`
--

DROP TABLE IF EXISTS `EVehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EVehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Brand` varchar(50) DEFAULT NULL,
  `Model` varchar(100) DEFAULT NULL,
  `AccelSec` float DEFAULT NULL,
  `TopSpeed_KmH` int DEFAULT NULL,
  `Range_Km` int DEFAULT NULL,
  `Efficiency_WhKm` int DEFAULT NULL,
  `FastCharge_KmH` int DEFAULT NULL,
  `RapidCharge` enum('Yes','No') DEFAULT NULL,
  `PowerTrain` varchar(10) DEFAULT NULL,
  `PlugType` varchar(20) DEFAULT NULL,
  `BodyStyle` varchar(20) DEFAULT NULL,
  `Segment` char(1) DEFAULT NULL,
  `Seats` int DEFAULT NULL,
  `PriceEuro` int DEFAULT NULL,
  `Date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EVehicles`
--

LOCK TABLES `EVehicles` WRITE;
/*!40000 ALTER TABLE `EVehicles` DISABLE KEYS */;
INSERT INTO `EVehicles` VALUES (1,'Tesla','Model 3 Long Range Dual Motor',4.6,233,450,161,940,'Yes','AWD','Type 2 CCS','Sedan','D',5,55480,'2016-08-24'),(2,'Volkswagen','ID.3 Pure',10,160,270,167,250,'Yes','RWD','Type 2 CCS','Hatchback','C',5,30000,'2016-08-25'),(4,'BMW','iX3',6.8,180,360,206,560,'Yes','RWD','Type 2 CCS','SUV','D',5,68040,'2016-08-29'),(8,'Peugeot','e-208',8.1,150,275,164,420,'Yes','FWD','Type 2 CCS','Hatchback','B',5,29682,'2016-09-02'),(9,'Tesla','Model 3 Standard Range Plus',5.6,225,310,153,650,'Yes','RWD','Type 2 CCS','Sedan','D',5,46380,'2016-09-05'),(10,'Audi','Q4 e-tron',6.3,180,400,193,540,'Yes','AWD','Type 2 CCS','SUV','D',5,55000,'2016-09-06'),(11,'Mercedes','EQC 400 4MATIC',5.1,180,370,216,440,'Yes','AWD','Type 2 CCS','SUV','D',5,69484,'2016-09-07'),(12,'Nissan','Leaf',7.9,144,220,164,230,'Yes','FWD','Type 2 CHAdeMO','Hatchback','C',5,29234,'2016-09-08'),(13,'Hyundai','Kona Electric 64 kWh',7.9,167,400,160,380,'Yes','FWD','Type 2 CCS','SUV','B',5,40795,'2016-09-09'),(14,'BMW','i4',4,200,450,178,650,'Yes','RWD','Type 2 CCS','Sedan','D',5,65000,'2016-09-12'),(15,'Hyundai','IONIQ Electric',9.7,165,250,153,210,'Yes','FWD','Type 2 CCS','Liftback','C',5,34459,'2016-09-13'),(16,'Volkswagen','ID.3 Pro S',7.9,160,440,175,590,'Yes','RWD','Type 2 CCS','Hatchback','C',4,40936,'2016-09-14');
/*!40000 ALTER TABLE `EVehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-03 14:31:52
