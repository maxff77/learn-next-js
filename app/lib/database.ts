// import { Pool } from 'pg';

// const config = {
//   user: 'postgres',
//   password: '3nf0c4t3%3ntI',
//   host: 'localhost',
//   port: 5432,
//   database: 'LOHARI',
// };

// let connection: any;

// if (!connection) {
//   connection = new Pool(config);
// }

// export { connection };


import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
