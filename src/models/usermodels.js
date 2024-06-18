// models.js
require('dotenv').config()
const pool=require("../services/db")


module.exports.login = (data, callback) => {

    const SQLSTATEMENT = `
        SELECT * FROM Users
        WHERE Users.name=?;
    `;

    VALUES = [data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.getusername = (data, callback) => {

    const SQLSTATEMENT = `
        SELECT name FROM Users
        WHERE Users.userid=?;
    `;

    VALUES = [data.userid];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.getall = (callback) => {

    const SQLSTATEMENT = `
        SELECT userid,name FROM Users
    `;

    pool.query(SQLSTATEMENT, callback);
};


module.exports.register = (data, callback) => {

    const SQLSTATEMENT = `
        INSERT INTO Users (name,password)
        VALUES (?, ?);
    `;

    VALUES = [data.name, data.password];

    pool.query(SQLSTATEMENT, VALUES,callback);
};

module.exports.readUserByEmailAndUsername = (data, callback) => {

    const SQLSTATEMENT = `
        SELECT *
        FROM users
        WHERE users.name = ?;
    `;

    VALUES = [data.name];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
