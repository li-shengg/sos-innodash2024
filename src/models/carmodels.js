require('dotenv').config()
const pool=require("../services/db")


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


module.exports.updatewashingstatus = (data,callback) => {

    const SQLSTATEMENT = `
        UPDATE Cars SET time_pay=CURRENT_TIME
        WHERE carplate=?
    `;
    const VALUES=[data.carplate]
    pool.query(SQLSTATEMENT,VALUES,callback);
};

module.exports.updatepaymentstatus = (data,callback) => {
    // Payment Details
    var cost;

    const SQLSTATEMENT1 = `
        SELECT * FROM Cars WHERE carplate=? DESC LIMIT 1
    `;
    const VALUES=[data.carplate]
    pool.query(SQLSTATEMENT1,VALUES,(err,res)=>{
        if(err){
            return callback(null,err)
        }else{
            const cartype=res[0].cartype;
            if(cartype==)


        }
        
        



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
