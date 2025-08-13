import { FastifyInstance, FastifyReply } from "fastify";
import { RefreshTokenService } from "../../Domain/services/refreshTokenService.js";
import { TokenService } from "../services/tokenService.js";
import { UserService } from "../../Domain/services/userService.js";
import { LoginUserFacade } from "./loginUserFacade.js";
import { BadRequestError } from "../../../../shared/types/Errors/BadRequest.js";

export class RefreshTokenFacade {
  constructor(
    private readonly refreshTokenService: RefreshTokenService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly loginUserFacade: LoginUserFacade,
  ) { }
  
  async verifyCanGenerateNewToken(userId: string, app: FastifyInstance): Promise<boolean> {
    const refreshToken = await this.refreshTokenService.get(userId);
    
    if(!refreshToken)
      throw new BadRequestError("O usuário não tem um refresh token gerado");
    
    const valid = this.tokenService.verifyTokenIsValid(app, refreshToken.refreshToken);
    
    return valid;
  }
  
  async generateNewToken(app: FastifyInstance, reply: FastifyReply, userId: string) {
    const canRefresh = await this.verifyCanGenerateNewToken(userId as string, app);

    if(!canRefresh)
      throw new BadRequestError("Refresh token expirado");
    

    const userInfo = await this.userService.getUserInfo(userId);
    const newAcessToken = await this.tokenService.generateAcessToken(app, userInfo.id, userInfo.email, userInfo.name);
    this.loginUserFacade.SetAcessToken(reply, newAcessToken);

  }
}