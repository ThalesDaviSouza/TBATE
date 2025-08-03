import { prisma } from "../../../../prisma/index.js";
import { CreateUserDto } from "../dtos/createUserDto.js";

export class UserService {
  async verifyUserExists(googleId: string): Promise<boolean>{
    const user = await prisma.user.findFirst({
      where: {
        googleId: googleId
      }
    });

    if(!user)
      return false;

    return true;
  }

  async createUser(userInfo: CreateUserDto) {
    try{
      const user = await prisma.user.create({
        data: {
          googleId: userInfo.googleId,
          email: userInfo.email,
          name: userInfo.name
        }
      });
    }
    catch(error){
      console.log("Falha ao criar o usuário");
      throw error;
    }
  }
}