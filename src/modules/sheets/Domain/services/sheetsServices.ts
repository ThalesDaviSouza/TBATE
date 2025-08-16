import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../../../prisma/index.js";
import { createSheetDto } from "../../Application/dtos/createSheetDto.js";

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

  async createSheet(dto: createSheetDto, tx?: Prisma.TransactionClient){
    let db: PrismaClient | Prisma.TransactionClient = prisma;
    
    if(tx)
      db = tx;

    const sheet = await db.sheet.create({
      data: {
        name: dto.name!,
        userId: dto.userId!,
        description: dto.description!,
        health: dto.health!,
        maxHealth: dto.maxHealth!,
        mana: dto.mana!,
        maxMana: dto.maxMana!,
        race: dto.race!
      }
    });

    return sheet;
  }
}