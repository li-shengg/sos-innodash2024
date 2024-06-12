const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  try {
    // Delete all existing users and cars
    await prisma.users.deleteMany();
    await prisma.cars.deleteMany();

    // Hash passwords
    const hashedPassword1 = await bcrypt.hash('password1', 10);
    const hashedPassword2 = await bcrypt.hash('password2', 10);
    const hashedPassword3 = await bcrypt.hash('password3', 10);

    // Create initial users with hashed passwords
    const users = await prisma.users.createMany({
      data: [
        { userid: 1, name: 'John Doe', password: hashedPassword1 },
        { userid: 2, name: 'Jane Doe', password: hashedPassword2 },
        { userid: 3, name: 'Alice', password: hashedPassword3 }
      ]
    });

    console.log('Initial users created:', users);

    // Create initial cars with specified car IDs starting from 1
    const cars = await prisma.cars.createMany({
      data: [
        { carid: 1, cartype: 'SaloonCar', carplate: 'ABC123', date: new Date(), time: new Date(), tips: 10.0 },
        { carid: 2, cartype: 'MPV_SUV_Minivan', carplate: 'XYZ456', date: new Date(), time: new Date(), tips: 5.0 },
        { carid: 3, cartype: 'LargeVan', carplate: 'LMN789', date: new Date(), time: new Date(), tips: 7.0 },
        { carid: 4, cartype: 'Minibus', carplate: 'JKL012', date: new Date(), time: new Date(), tips: 12.0 },
        { carid: 5, cartype: 'Taxi_Saloon', carplate: 'GHI345', date: new Date(), time: new Date(), tips: 8.0 },
        { carid: 6, cartype: 'Taxi_SUV', carplate: 'DEF678', date: new Date(), time: new Date(), tips: 6.0 }
      ]
    });

    console.log('Initial cars created:', cars);
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
