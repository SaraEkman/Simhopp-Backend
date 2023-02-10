-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: simhopp
-- ------------------------------------------------------
-- Server version	5.7.24

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
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `image` varchar(258) NOT NULL,
  `createDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int(11) NOT NULL,
  `softDelete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `news_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (67,'<p><a target=\"_top\" href=\"https://www.polisensimhopp.se/nyheter/?ID=31510&amp;NID=989695\">Vinter-SM 2023</a></p><p><br></p><p>Fr&#229;n 20 - 22 januari var det SM i J&#246;nk&#246;ping och 7 av v&#229;ra hoppare &#229;kte dit f&#246;r att t&#228;vla. Polisen gjorde en str&#229;lande t&#228;vling och alla polisen hoppare genomf&#246;rde bra t&#228;vlingar. Vi kan med gl&#228;dje meddela att vi fick 4 guld medaljer och 3 brons. Med andra ord har vi nu 3 nya Svenska M&#228;stera i klubben!</p><p>&#160;</p><p>Under fredagen s&#229; t&#228;vlade Amanda Lundin, Richard Roop-Ilste och Folke Barenius p&#229; h&#246;ga hopp. Amanda tog guld, Richard tog ocks&#229; guld och Folke tog brons! Amanda fick po&#228;ngen 267,20.</p><p>Richard fick 322,25 och Folke fick 240,0. Otroligt bra!</p><p>&#160;</p><p>L&#246;rdagen s&#229; var det dags f&#246;r Jacob Stoltz, Folke Barenuis, Simon Ringborg, Wilmer Ekmark Tj&#228;rnberg och Stella Lindqvist. De alla hoppade fint och de alla tog sig till final! Finalen f&#246;r herrar 1 meter slutade med att Jacob tog guld med po&#228;ngen 324,60, Wilmer 5:de plats med po&#228;ngen 250,80, Folke 6:de plats med po&#228;ngen 233.75 och Simon 10:de plats med po&#228;ngen 206,0. Stella hoppade fantastikst p&#229; tre meter och tog brons med po&#228;ngen 216,85.</p><p>&#160;</p><p>Sista dagen av SM var p&#229; s&#246;ndagen och d&#229; t&#228;vlade Jacob Stoltz, Folke Barenuis, Simon Ringborg, Wilmer Ekmark och Stella Lindqvist. F&#246;r herarna s&#229; var det tre meter och d&#228;r tog Jacob guld igen med po&#228;ngen 329.05, Wilmer tog brons med po&#228;ngen 273,0, Simon 5:de plats med po&#228;ngen 248,80 och Folke 6:de plats med po&#228;ngen 240.35. Stella hoppade en meter damer final och kom p&#229; en 9:de plats med po&#228;ngen 169.25.&#160;</p><p>&#160;</p><p>De som nu allts&#229; kan kalla sig Svenska m&#228;stare &#228;r Amanda Lundin (h&#246;ga hopp), Richard Roop-Iliste (H&#246;ga hopp) och Jacob Stoltz (1m och 3m)</p><p>&#160;</p><p>Bra hoppat av alla hoppare!!!</p><p>&#160;</p><p><a href=\"https://www.polisensimhopp.se/docs/147/2864/01.%20Vinter%20SM%202023%2020-22%20Jan%20J%C3%B6nk%C3%B6ping.pdf\" target=\"_blank\" rel=\"noopener\"><strong>Resultat</strong></a></p>','1675628701083-img1.jpg','2023-02-05 20:25:01',20,0),(68,'<p><a target=\"_top\" href=\"https://www.polisensimhopp.se/nyheter/?ID=31510&amp;NID=984698\">SPIF Masters Camp</a><br></p><p><br></p><p>6-8 Januari arrangerade vi SPIF Masters Camp. Ett simhoppsl&#228;ger f&#246;r vuxna!</p><p>&#160;</p><p>Det var totalt 21st simhoppare fr&#229;n Sverige, Norge, Finland, Danmark och England.</p><p>&#160;</p><p>Det blev ett v&#228;ldigt bra l&#228;ger med mycket tr&#228;ning och gl&#228;dje!<br>Simhopparna fick tr&#228;na simhopp, landtr&#228;ning, handst&#229;ende, pilates, r&#246;rlighet och tekniktr&#228;ning i tyndlyftning. Tr&#228;ningen h&#246;lls av f&#246;reningen utvecklings och t&#228;vlingstr&#228;nare. Och externa tr&#228;nare f&#246;r handst&#229;ende, pilates samt tyngdlyftningen.</p><p>&#160;</p><p>Ungef&#228;r 13 timmars tr&#228;ning p&#229; 3 dagar! Vi &#228;r v&#228;ldigt imponerade och stolta &#246;ver samtliga som deltog!</p><p>&#160;</p><p>Vi hoppas kunna arrangera det h&#228;r l&#228;gret n&#228;sta &#229;r ocks&#229;!</p>','1675628909161-512.jpg','2023-02-05 20:28:29',20,0),(69,'<div><a target=\"_top\" href=\"https://www.polisensimhopp.se/nyheter/?ID=31510&amp;NID=978651\">Terminstart VT23</a><br></div><div><br></div><div>Nedan f&#246;ljer information om terminstarten VT23.<br>Vi vill f&#246;rst passa p&#229; att h&#228;lsa alla nya medlemmar, som ska b&#246;rja i sin allra f&#246;rsta simhoppsgrupp, varmt V&#228;lkomna till Polisens IF Simhopp! Givetvis &#228;r alla befintliga medlemmar lika v&#228;lkomna tillbaka!&#160;</div><div>&#160;</div><div>VT23 b&#246;rjar v.4 (23-28/1) f&#246;r alla hoppskolegrupper och masters.<br>Under vecka 1 kommer alla befientliga medlemmar f&#229; en avisering. Genom att betala aviseringen bekr&#228;ftar man att man vill beh&#229;lla sin plats.</div><div>Under vecka 2 och 3 ska alla medlemmar i Hoppskolan och masters f&#229; kallelse f&#246;r sin terminstr&#228;ning via mail. Skulle detta inte ha n&#229;tt er, maila&#160;<a href=\"mailto:info@polisensimhopp.se\">info@polisensimhopp.se</a>&#160;p&#229; en g&#229;ng, s&#229; ordnar vi med detta. All</div><div>&#160;</div><div><strong>H&#228;r &#228;r ett g&#228;ng bra l&#228;nkar att ha koll p&#229; inf&#246;r terminsstarten:</strong></div><div><a href=\"http://www.polisensimhopp.se/sida/?ID=31868\" target=\"_blank\" rel=\"noopener\">Ordningsregler i Eriksdalsbadet och Simhoppshallen</a>&#160;(Samt info om Inpasseringskorten!)</div><div><a href=\"https://www.polisensimhopp.se/docs/147/2864/Termins%C3%B6versikt%20VT23.pdf\" target=\"_blank\" rel=\"noopener\">Termins&#246;versikt VT2023</a></div><div><a href=\"http://www.polisensimhopp.se/kalender/?ID=28715\" target=\"_blank\" rel=\"noopener\">Digital kalender &#246;ver alla tr&#228;ningar i Hoppskolan (Fylls p&#229; i b&#246;rjan av Januari)</a></div><div><a href=\"http://www.polisensimhopp.se/nyheter/?ID=31510&amp;NID=475393\" target=\"_blank\" rel=\"noopener\">Info om medf&#246;ljare och L&#228;ktaren i simhoppshallen</a></div>','1675628979672-134.jpg','2023-02-05 20:29:39',20,0),(70,'<p>Under 16-19 december befann vi oss i London, d&#228;r vi blivit inbjudna till London Legacy Open. En v&#228;ldigt bra t&#228;vling som arrangerades av Dive London.</p><p>&#160;</p><p><a target=\"_top\" href=\"https://www.polisensimhopp.se/nyheter/?ID=31510&amp;NID=977685\">London Legacy Open</a><br></p><p><br></p><p>Vi hade 2 deltagare i B-killar, Emil R&#246;stlund och Wilmer Ekmark Tj&#228;rnberg. 1 i A-killar, Folke Barenius och 1 i Damer, Fredrika Hansson.</p><p>Amanda Lundin skulle deltagit i A-flickor h&#246;ga hopp men gjorde tyv&#228;rr illa foten och kunde inte delta.&#160;</p><p>Vi hade &#228;ven s&#228;llskap av v&#229;ra v&#228;nner i S&#246;dert&#228;lje Sims&#228;llskap, Tr&#228;nare Peter Axtelius och Hoppare Ellen Andersson.</p><p>&#160;</p><p>B-killarna genomf&#246;rde bra t&#228;vlingar p&#229; samtliga h&#246;jder,</p><p>Emil kom till final p&#229; h&#246;ga hopp och lyckades d&#228;r ta guldet!</p><p>B&#229;da killarna tog sig till Final p&#229; 3m, Wilmer hoppade v&#228;ldigt fint, bel&#246;nades med silvermedaljen och tog person b&#228;sta! Emil hoppade bra men missade p&#229; 2 hopp och hamnade d&#229; p&#229; 5:e plats i finalen. P&#229; 1m d&#228;r det &#228;r dirkat final, hoppade de ocks&#229; fint, Wilmer 6:a, Emil 8:a.</p><p>&#160;</p><p>Folke genomf&#246;rde tv&#229; bra t&#228;vlingar p&#229; 1m och 3m.</p><p>1m placerade han sig 9:a, P&#229; 3m tog han sig vidare till final som 8:a och kl&#228;ttrade upp till 7:a.</p><p>&#160;</p><p>Fredrika gjorde tv&#229; bra t&#228;vlingar p&#229; 1m och 3m. Hon visade p&#229; stabilitet och styrka. Med en kraftig konkurans s&#229; placerade hon sig 14 p&#229; 1m och 11:a p&#229; 3m.</p><p>&#160;</p><p>Vi tar med oss m&#229;nga l&#228;rdomar och en hel del inspiration till det nya &#229;ret.</p>','1675629078152-56.jpg','2023-02-05 20:31:18',20,0);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-06  3:08:52
