import { FastifyInstance } from "fastify";
import { RefreshTokenService } from "../../Domain/services/refreshTokenService.js";
import { TokenService } from "../services/tokenService.js";

export class RefreshTokenFacade {
  constructor(
    private readonly refreshTokenService: RefreshTokenService,
    private readonly tokenService: TokenService
  ) { }

  async verifyCanGenerateNewToken(userId: string, app: FastifyInstance){
    const refreshToken = await this.refreshTokenService.get(userId);

    if(!refreshToken)
      throw new Error("O usuário não tem um refresh token gerado");

    const valid = this.tokenService.verifyTokenIsValid(app, refreshToken.refreshToken);

    if(valid)
      console.log('O refresh token é valido');
    else
      console.log('O refresh token não é valido');

  }

}