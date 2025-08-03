import { UserService } from "../../Domain/services/userService.js";
import { CreateUserDto } from "../../Domain/dtos/createUserDto.js";
import { prisma } from "../../../../prisma/index.js";

export class CreateUserFacade {
  constructor(
    private readonly userService: UserService
  ) {}

  async createUser(userData: CreateUserDto){
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