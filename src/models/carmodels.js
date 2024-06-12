// models.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Select All Cars
async function findAllCars() {
    return await prisma.cars.findMany();
}

module.exports = {
    findAllCars
};
