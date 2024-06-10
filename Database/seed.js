// add_user.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const address = process.argv[2];
    const paid = process.argv[3]; // Convert string to boolean

    const user = await prisma.users.create({
        data: {
            address,
            paid,
        },
    });
    console.log(user);
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });


