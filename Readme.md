## Simhopp-backend

Den här repo innehåller backend till Simhopp och är skrivit i Node.js med Express.js.
Database är MySql.

## Installation

För att köra projektet behöver du ha Node.js installerat. För att installera alla dependencies kör du: `npm install`.

MySql databasen behöver du också ha installerad. 
MedFöljer database Sql-dumps mapp med två filer som innehåller tabellerna som du kan importera i MySql Workbench eller PhpMyAdmin.

OBS Förutsetts att du har Klonat både frontend  [länken](https://github.com/SaraEkman/Simhopp) och backend projektet i samma mapp och följd instruktionerna för båda projekten, här nedanför finns instruktioner för att installera backend projektet.

## Konfigurera projektet

För att konfigurera projektet behöver du

1. Skapa en MySql databas med namnet `simhopp` och importera tabellerna från `simhopp-backend/Sql-dumps` mappen börja först med importera simhopp_users.sql och sedan simhopp_news.sql.

2. öppna en terminal och navigera till mappen där du har klonat `simhopp-backend` projektet och installera `npm i dotenv` sedan skappa .env fyll i följande:
3.  MYSQL_HOST = localhost
4.  MYSQL_USER = your username
5.  MYSQL_PASSWORD = your password
6.  MYSQL_DATABASE = simhopp
7.  MYSQL_PORT = 3306 (default port) or your port
## Starta projektet

För att starta projektet kör du: `npm start`.
När applikationen har startat, När applikationen har startat, öppna en webbläsare och navigera till `http://localhost:3000`.