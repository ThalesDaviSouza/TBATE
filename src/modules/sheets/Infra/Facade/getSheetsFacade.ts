import { FastifyRequest } from "fastify";
import { TokenService } from "../../../users/Infra/services/tokenService.js";
import { SheetsService } from "../../Domain/services/sheetsServices.js";

export class GetSheetsFacade {
  constructor(
    private tokenService: TokenService,
    private sheetsService: SheetsService,
  ) { }

  async getSheets(request: FastifyRequest){
    const userId = this.tokenService.getUserIdFromToken(request);
    const sheets = await this.sheetsService.getByUser(userId);

    return sheets;
  }
}