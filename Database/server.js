// server.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(express.json());


//Select Users
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.json(users);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


// Creating users
app.post('/user', async (req, res) => {
    const address = req.body.address;
    const paid=(req.body.paid=="true")

    console.log(address,paid)
    try {
        const user = await prisma.users.create({
            data: { address, paid },
        });
        res.json(user);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


// Update user information
app.put('/user/:address', async (req, res) => {
    const { address } = req.params;
    const paid  = req.body.paid=="true";

    try {
        const updatedUser = await prisma.users.update({
            where: { address },
            data: { paid },
        });
        res.json(updatedUser);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


// Delete user
app.delete('/user/:address', async (req, res) => {
    const { address } = req.params;

    try {
        const deletedUser = await prisma.users.delete({
            where: { address },
        });
        res.json(deletedUser);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


