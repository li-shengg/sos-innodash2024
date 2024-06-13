const fs = require('fs');
const path = require('path');

const prismaClientPath = path.join(__dirname, 'node_modules', '.prisma', 'client', 'index.js');

if (fs.existsSync(prismaClientPath)) {
  console.log('Prisma Client is initialized.');
} else {
  console.log('Prisma Client is not initialized.');
}
