DROP DATABASE IF EXISTS election;

CREATE DATABASE election;

USE election;

/* List of Commands
mysql --version
mysql -u root -p // -u = user, -p = password

1. CREATE DATABASE <database.name>;
2. USE <database.name>;
3. CREATE TABLE <table.name> (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    industry_connected BOOLEAN NOT NULL
);
4. DESCRIBE candidates;
5. INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES
    ('Victor', 'Lujan', 1),
    ('July', 'Anne', 0),
    ('Joe', 'Biden', 0),
    ('Joe', 'Dirt', 1);
6. SELECT * FROM candidates; // * = ALL COLUMNS, you can also call them individually e.g. first_name
7. SELECT first_name, last_name FROM candidates;
8. SELECT first_name, last_name
    FROM candidates
    WHERE industry_connected = 1;
9. SELECT first_name, last_name, industry_connected
    FROM candidates
    WHERE id = 5;
10. DROP DATABASE election; // to delete, no recourse, be careful...
11. source db/db.sql
...and this other command... source db/schema.sql
12. DROP DATABASE IF EXISTS election; // on top of db.sql
...which will enable the creation of a new database and only attempt to drop the database if it exists.
13. UPDATE candidates
    SET industry_connected = 1
    WHERE id = 3;
14. DELETE FROM candidates;
    WHERE first_name = 'Montague'; // it is preferred you use id bc its unique identifier
15. quit // to exit mySQL Shell
16. help // to find more commands in mySQL Shell
 */