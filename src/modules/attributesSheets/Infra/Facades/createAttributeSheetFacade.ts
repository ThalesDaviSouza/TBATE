import { AttributeType, Prisma, PrismaClient } from "@prisma/client";
import { AttributeSheetBuilder } from "../Builders/AttributeSheetBuilder.js";
import { AttributeUtilsService } from "../../../attributes/Infra/services/attributesUtilsService.js";
import { AttributeService } from "../../../attributes/Domain/services/attributesService.js";
import { buildAttributeSheet } from "../Directors/AttributeSheetDirector.js";
import { AttributesSheetsService } from "../../Domain/services/attributesSheetsService.js";

export class CreateAttributeSheetFacade {
  constructor(
    private attributeUtilsService: AttributeUtilsService,
    private attributeService: AttributeService,
    private attributeSheetService: AttributesSheetsService,
  ) { }

  async createAttributeSheet(type: AttributeType, sheetId: string, tx?: Prisma.TransactionClient) {
    const attributeBuilder = new AttributeSheetBuilder();
    const attributeName = this.attributeUtilsService.getAttributeNameByType(type);
    const attribute = await this.attributeService.getByName(attributeName);
    
    if(!attribute)
      throw new Error("Falha ao encontrar o atributo para criar a ficha");

    const attributeId = attribute.id;

    const dto = buildAttributeSheet(attributeBuilder, sheetId, attributeId);

    const createdAttributeSheet = await this.attributeSheetService.createAttributeSheet(dto, tx);

    return createdAttributeSheet;
  }
}