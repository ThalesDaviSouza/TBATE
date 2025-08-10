import { UserService } from "../../Domain/services/userService.js";
import { TokenService } from "../../Infra/services/tokenService.js";
import { CreateUserFacade } from "./createUserFacade.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { getTokenAdapter } from "../../users.module.js";
import { RefreshTokenService } from "../../Domain/services/refreshTokenService.js";

export class LoginUserFacade {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly createUserFacade: CreateUserFacade,
    private readonly refreshTokenService: RefreshTokenService
  ) { }

  async LoginUser(request: FastifyRequest): Promise<string> {
    const token = await getTokenAdapter().getOAth2Token(request);

    const tokeInfo = await this.tokenService.getUserDataFromToken(token);

    if(!await this.userService.verifyUserExists(tokeInfo.id)){
      await this.createUserFacade.createUser({
        googleId: tokeInfo.id,
        email: tokeInfo.email,
        name: tokeInfo.name
      });
    }

    const userId = await this.userService.getUserId(tokeInfo.id);

    // TODO: implementar autenticação
    
    const app = request.server;

    const acessToken = app.jwt.sign({
      id: userId,
      email: tokeInfo.email,
      name: tokeInfo.name 
    }, { expiresIn: '1m' });

    const refreshToken = app.jwt.sign({
      id: userId,
      type: 'refresh'
    }, { expiresIn: '1m' });

    this.refreshTokenService.save(refreshToken, userId);

    return acessToken;
  }

  
  async SetCookie(rep: FastifyReply, jwt: string) {
    rep.setCookie('token', jwt, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 // 1 minuto
    })
  }
}