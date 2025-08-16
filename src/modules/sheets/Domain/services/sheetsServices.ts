import { prisma } from "../../../../prisma/index.js";

export class SheetsService {
  async getByUser(userId: string){
    const sheets = await prisma.sheet.findMany({
      where: {
        userId: userId
      },
      select: {
        userId: true,
        name: true
      }
    });

    return sheets;
  }
}