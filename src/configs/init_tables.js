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
            CREATE TABLE Cars (
                carid INT PRIMARY KEY AUTO_INCREMENT,
                cartype VARCHAR(255) NOT NULL,
                carplate VARCHAR(255) NOT NULL,
                date DATE,
                time_wash TIME,
                time_pay TIME,
                tips DECIMAL(10,2),
                tips_for VARCHAR(255)
            );

            -- Insert initial users with hashed passwords
            INSERT INTO Users (name, password) VALUES
                ('John Doe', '$2b$10$D9oLjZBRej3e5lNIXViTPuf8SY9Qh..zx/S0lAstHNXXI.LkqSxPq'),
                ('Jane Doe', '$2b$10$D9oLjZBRej3e5lNIXViTPutyUQ60WOGlBL.Obeym1.V.HnvEKTFGi'),
                ('Alice', '$2b$10$D9oLjZBRej3e5lNIXViTPuXpaT1MhixLYInJVBxBvM4z8MonHYYFK');

            -- Insert initial cars
            INSERT INTO Cars (cartype, carplate, date, time_wash,time_pay, tips,tips_for) VALUES
                ('SaloonCar', 'ABC123', CURRENT_DATE, CURRENT_TIME,CURRENT_TIME, 10.0,"MINDS"),
                ('MPV_SUV_Minivan', 'XYZ456', CURRENT_DATE, CURRENT_TIME,CURRENT_TIME, 5.0,"John Doe"),
                ('LargeVan', 'LMN789', CURRENT_DATE, CURRENT_TIME,CURRENT_TIME, 7.0,"MINDS"),
                ('Minibus', 'JKL012', CURRENT_DATE, CURRENT_TIME,CURRENT_TIME, 12.0,"Jane Doe"),
                ('Taxi_Saloon', 'GHI345', CURRENT_DATE, CURRENT_TIME,CURRENT_TIME, 8.0,"MINDS"),
                ('Taxi_SUV', 'DEF678', CURRENT_DATE, CURRENT_TIME,CURRENT_TIME, 6.0,"MINDS");
        `;

        pool.query(SQLSTATEMENT, (error, results, fields) => {
            if (error) {
                console.error("Error executing init_tables:", error);
            } else {
                console.log("Tables created and data inserted:", results);
            }
            process.exit();
        });
        console.log(password1)
        console.log(password2)
        console.log(password3)
    } catch (error) {
        console.error("Error hashing passwords or executing SQL:", error);
        process.exit(1);
    }
}

createTablesAndInsertData();
