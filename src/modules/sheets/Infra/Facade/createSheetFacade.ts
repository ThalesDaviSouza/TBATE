import { FastifyRequest } from "fastify";
import { TokenService } from "../../../users/Infra/services/tokenService.js";
import { buildSheet } from "../Directors/SheetDirector.js";
import { SheetBuilder } from "../Builders/SheetBuilder.js";
import { SheetsService } from "../../Domain/services/sheetsServices.js";
import { prisma } from "../../../../prisma/index.js";
import { CreateAttributeSheetFacade } from "../../../attributesSheets/Infra/Facades/createAttributeSheetFacade.js";
import { AttributeType } from "@prisma/client";

export class CreateSheetFacade {
  constructor(
    private tokenService: TokenService,
    private sheetService: SheetsService,
    private createAttributeSheetFacade: CreateAttributeSheetFacade
  ) { }

  async createSheet(request: FastifyRequest, characterName: string) {
    try{
      const sheet = await prisma.$transaction(async (tx) => {
        const userId = this.tokenService.getUserIdFromToken(request);

        const sheetBuilder = new SheetBuilder();

        const sheetDto = buildSheet(sheetBuilder, userId, characterName);

        const sheet = await this.sheetService.createSheet(sheetDto, tx);
        
        const charismaAttribute = await this.createAttributeSheetFacade.createAttributeSheet(AttributeType.Charisma, sheet.id, tx);
        const dexterityAttribute = await this.createAttributeSheetFacade.createAttributeSheet(AttributeType.Dexterity, sheet.id, tx);
        const impetusAttribute = await this.createAttributeSheetFacade.createAttributeSheet(AttributeType.Impetus, sheet.id, tx);
        const intellectAttribute = await this.createAttributeSheetFacade.createAttributeSheet(AttributeType.Intellect, sheet.id, tx);
        const strengthAttribute = await this.createAttributeSheetFacade.createAttributeSheet(AttributeType.Strength, sheet.id, tx);
        const talentAttribute = await this.createAttributeSheetFacade.createAttributeSheet(AttributeType.Talent, sheet.id, tx);
        const vigorAttribute = await this.createAttributeSheetFacade.createAttributeSheet(AttributeType.Vigor, sheet.id, tx);

        return sheet;
      });

      return sheet;
    }
    catch(err) {
      throw err;
    }
  }
}