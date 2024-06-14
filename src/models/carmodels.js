require('dotenv').config()
const pool=require("../services/db")

module.exports.selecttodaycars = (callback) => {

    const SQLSTATEMENT = `
       SELECT * FROM Cars
       WHERE DATE(date) = CURDATE()

    `;

    pool.query(SQLSTATEMENT, callback);
};

module.exports.selectpastcars = (callback) => {
    const SQLSTATEMENT = `
       SELECT * FROM Cars
       WHERE DATE(date) != CURDATE()
    `;

    pool.query(SQLSTATEMENT,callback);
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
    // Payment Details
    let cost;

    const SQLSTATEMENT1 = `
        SELECT * FROM Cars WHERE carplate=? ORDER BY carid DESC LIMIT 1
    `;
    const VALUES1 = [data.carplate];

    pool.query(SQLSTATEMENT1, VALUES1, (err, res) => {
        if (err) {
            return callback(err);
        }

        if (res.length === 0) {
            return callback(new Error("No Such Car Plate"));
        }

        const cartype = res[0].cartype;
        console.log(cartype)
        switch (cartype) {
            case "SaloonCar":
                cost = 12;
                break;
            case "MPV_SUV_Minivan":
                cost = 13;
                break;
            case "LargeVan":
                cost = 17;
                break;
            case "Minibus":
                cost = 22;
                break;
            case "Taxi_Saloon":
                cost = 5;
                break;
            case "Taxi_SUV":
                cost = 8;
                break;
            default:
                return callback(new Error("Unknown car type"));
        }
     
        const totalpaid = data.totalpaid;
        const tips = totalpaid - cost;
        if (tips < 0) {
            return callback(new Error(`Total Paid cannot be less than washing cost: $${cost}`));
        }

        const SQLSTATEMENT2 = `
            UPDATE Cars 
            SET total_paid=?,tips=?, tips_for=?,time_pay=CURRENT_TIME
            WHERE carplate=?
            ORDER BY carid DESC 
            LIMIT 1;

        `;
        const VALUES2 = [data.totalpaid,tips, data.tips_for, data.carplate,data.carplate];

        pool.query(SQLSTATEMENT2, VALUES2, callback);
    });
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
