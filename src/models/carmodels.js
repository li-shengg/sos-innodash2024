require('dotenv').config()
const pool=require("../services/db")

module.exports.selecttodaycars = (callback) => {

    const SQLSTATEMENT = `
       SELECT * FROM Cars
       WHERE DATE(date) = CURDATE()

    `;

    pool.query(SQLSTATEMENT, callback);
};


module.exports.getcar = (data,callback) => {
    const SQLSTATEMENT = `
       SELECT * FROM Cars
       WHERE carid=?
    `;
    const VALUES=[data.carid]


    pool.query(SQLSTATEMENT,VALUES,callback);
};

module.exports.addcar = (data, callback) => {

    const SQLSTATEMENT = `
        INSERT INTO Cars(cartype,carplate,date,time_wash) VALUES
        (?,?,CURRENT_DATE,CURRENT_TIME)
    `;

    VALUES = [data.cartype,data.carplate];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectallcars = (callback) => {

    const SQLSTATEMENT = `
        SELECT * FROM Cars
    `;

    pool.query(SQLSTATEMENT, callback);
};


module.exports.updatepaymentstatus = (data, callback) => {

    const SQLSTATEMENT = `
         UPDATE Cars 
            SET total_paid=?,tips=?, tips_for=?,time_pay=CURRENT_TIME
            WHERE carid=?
    `;
    const VALUES = [data.totalpaid,data.tips, data.tips_for, data.carid];

    pool.query(SQLSTATEMENT, VALUES, callback);
};



// // models.js
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// require('dotenv').config()

// //Select All Cars
// async function findAllCars() {
//     return await prisma.cars.findMany();
// }

// module.exports = {
//     findAllCars
// };
