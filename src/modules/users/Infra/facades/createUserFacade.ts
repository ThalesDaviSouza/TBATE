import { UserService } from "../../Domain/services/userService.js";
import { prisma } from "../../../../prisma/index.js";
import { CreateUserDto } from "../../Application/dtos/createUserDto.js";

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