//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////

const app = require('./src/app')

//////////////////////////////////////////////////////
// SETUP ENVIRONMENT
//////////////////////////////////////////////////////
const PORT = 3000


//Check prisma client
const fs = require('fs');
const path = require('path');

const prismaClientPath = path.join(__dirname, 'node_modules', '.prisma', 'client', 'index.js');

if (fs.existsSync(prismaClientPath)) {
  console.log('Prisma Client is initialized at root.');
} else {
  console.log('Prisma Client is not initialized at root.');
}


//////////////////////////////////////////////////////
// START SERVER
//////////////////////////////////////////////////////
app.listen(PORT, () =>{
    console.log(`App listening at port ${PORT}`)
})
