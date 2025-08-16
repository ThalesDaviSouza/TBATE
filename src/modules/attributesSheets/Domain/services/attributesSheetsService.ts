import { Prisma, PrismaClient } from "@prisma/client";
import { AttributeSheetCreateDto } from "../../Application/dtos/attributeSheetCreateDto.js";
import { prisma } from "../../../../prisma/index.js";

export class AttributesSheetsService {
  async createAttributeSheet(dto: AttributeSheetCreateDto, tx?: Prisma.TransactionClient){
    let db: PrismaClient | Prisma.TransactionClient = prisma;

    if(tx)
      db = tx;

    const attributeSheet = await db.attributeSheet.create({
      data: {
        attributeId: dto.attributeId!,
        sheetId: dto.sheetId!,
        value: dto.value!,
        currentValue: dto.currentValue!
      }
    });

    return attributeSheet;
  }
}