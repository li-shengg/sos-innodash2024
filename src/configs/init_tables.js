const bcrypt = require('bcrypt');
const pool = require('../services/db');

const saltRounds = 10;

async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

async function createTablesAndInsertData() {
    try {
        const password1 = await hashPassword('Password1');
        const password2 = await hashPassword('Password2');
        const password3 = await hashPassword('Password3');

        const SQLSTATEMENT = `
            -- Drop tables if they exist
            DROP TABLE IF EXISTS Users;
            DROP TABLE IF EXISTS Cars;

            -- Create Users table
            CREATE TABLE Users (
                userid INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            );

            -- Create Cars table
            CREATE TABLE cars (
                carid INT PRIMARY KEY AUTO_INCREMENT,
                cartype VARCHAR(255) NOT NULL,
                carplate VARCHAR(255) NOT NULL,
                date DATE,
                time TIME,
                tips DECIMAL(10,2)
            );

            -- Insert initial users with hashed passwords
            INSERT INTO Users (name, password) VALUES
                ('John Doe', '${password1}'),
                ('Jane Doe', '${password2}'),
                ('Alice', '${password3}');

            -- Insert initial cars
            INSERT INTO Cars (cartype, carplate, date, time, tips) VALUES
                ('SaloonCar', 'ABC123', CURRENT_DATE, CURRENT_TIME, 10.0),
                ('MPV_SUV_Minivan', 'XYZ456', CURRENT_DATE, CURRENT_TIME, 5.0),
                ('LargeVan', 'LMN789', CURRENT_DATE, CURRENT_TIME, 7.0),
                ('Minibus', 'JKL012', CURRENT_DATE, CURRENT_TIME, 12.0),
                ('Taxi_Saloon', 'GHI345', CURRENT_DATE, CURRENT_TIME, 8.0),
                ('Taxi_SUV', 'DEF678', CURRENT_DATE, CURRENT_TIME, 6.0);
        `;

        pool.query(SQLSTATEMENT, (error, results, fields) => {
            if (error) {
                console.error("Error executing init_tables:", error);
            } else {
                console.log("Tables created and data inserted:", results);
            }
            process.exit();
        });
    } catch (error) {
        console.error("Error hashing passwords or executing SQL:", error);
        process.exit(1);
    }
}

createTablesAndInsertData();
