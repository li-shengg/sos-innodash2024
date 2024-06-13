// models.js
require('dotenv').config()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkPrismaInitialization() {
    try {
        // Attempt a simple query to check if Prisma Client is initialized
        await prisma.$queryRaw`SELECT 1`;
        console.log('Prisma Client initialized successfully at models.');
    } catch (error) {
        console.error('Prisma Client initialization failed at models:', error);
        throw error;
    }
}

checkPrismaInitialization()

//Login
async function login(name) {
    try {
        checkPrismaInitialization()
        const user = await prisma.users.findFirst({
            where: { name },
            select: {
                userid: true,
                password: true,
            },
        });
        return user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

//Add new user
async function adduser() {
    return await prisma.users.findMany();
}   

module.exports = {
    adduser,
    login
};
