import { OAuth2Token } from "@fastify/oauth2";
import { UserService } from "../../Domain/services/userService.js";
import { CreateUserDto } from "../../Domain/dtos/createUserDto.js";
import { prisma } from "../../../../prisma/index.js";

type GoogleUserInfo = {
  id: string,
  email: string,
  name: string
};

export class CreateUserFacade {
  constructor(
    private readonly userService: UserService
  ) {}

  async createUser(token: OAuth2Token){
     const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${token.token.access_token}`,
      },
    });

    if(!response.ok){
      throw Error(`Erro ao validar o token - Status: ${response.status} - Erro: ${await response.text()}`);
    }

    const userInfo = await response.json() as GoogleUserInfo;

    if(!userInfo.id || !userInfo.email || !userInfo.name){
      throw Error("Resposta incompleta do Google");
    }

    const userData: CreateUserDto = {
      googleId: userInfo.id,
      email: userInfo.email,
      name: userInfo.name
    };

    const user = await prisma.user.findFirst({
      where: {
        googleId: userData.googleId
      }
    });

    if(user){
      throw Error("Já existe um usuário com essa conta");
    }

    this.userService.createUser(userData);
  }

}