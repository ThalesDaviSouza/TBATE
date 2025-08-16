import { FastifyRequest } from "fastify";
import { TokenService } from "../../../users/Infra/services/tokenService.js";
import { AbstractSheetBuilder } from "../Builders/AbstractSheetBuilder.js";
import { buildSheet } from "../Directors/SheetDirector.js";
import { SheetBuilder } from "../Builders/SheetBuilder.js";
import { SheetsService } from "../../Domain/services/sheetsServices.js";

export class CreateSheetFacade {
  constructor(
    private tokenService: TokenService,
    private sheetService: SheetsService
  ) { }

  async createSheet(request: FastifyRequest, characterName: string) {
    const userId = this.tokenService.getUserIdFromToken(request);

    const sheetBuilder = new SheetBuilder();

    const sheetDto = buildSheet(sheetBuilder, userId, characterName);

    const sheet = await this.sheetService.createSheet(sheetDto);
    
    return sheet;
  }
}