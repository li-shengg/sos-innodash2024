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

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// //Login
// async function login(name) {
//     try {
//         const user = await prisma.users.findFirst({
//             where: { name },
//             select: {
//                 userid: true,
//                 password: true,
//             },
//         });
//         return user;
//     } catch (error) {
//         console.error("Error logging in:", error);
//         throw error;
//     }
// }

// //Add new user
// async function adduser() {
//     return await prisma.users.findMany();
// }   

// module.exports = {
//     adduser,
//     login
// };
