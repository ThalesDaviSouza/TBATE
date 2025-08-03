import { OAuth2Token } from "@fastify/oauth2";
import { UserService } from "../../Domain/services/userService.js";
import { TokenService } from "../../Domain/services/tokenService.js";
import { CreateUserFacade } from "./createUserFacade.js";

export class LoginUserFacade {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly createUserFacade: CreateUserFacade
  ) { }

  async LoginUser(token: OAuth2Token){
    const tokeInfo = await this.tokenService.getUserDataFromToken(token);

    if(!await this.userService.verifyUserExists(tokeInfo.id)){
      this.createUserFacade.createUser({
        googleId: tokeInfo.id,
        email: tokeInfo.email,
        name: tokeInfo.name
      });
    }

    // TODO: implementar autenticação
    console.log("Logar");

  }
}