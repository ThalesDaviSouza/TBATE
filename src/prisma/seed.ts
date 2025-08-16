import { PrismaClient } from "@prisma/client";
import { seedAttributes } from "./seeds/attributes.js";

const prisma = new PrismaClient();
prisma.$connect();

async function main(){
  await seedAttributes(prisma);
}

await main()
  .then(() => {
    console.log('Seed inicial feito');
  })
  .catch((err) => {
    console.error('Erro no seed inicial');
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })