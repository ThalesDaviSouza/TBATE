import { prisma } from "../../../../prisma/index.js";
import { CreateUserDto } from "../../Application/dtos/createUserDto.js";
import { UserInfoDto } from "../../Application/dtos/userInfoDto.js";

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

  async getUserId(googleId: string) : Promise<string> {
    const userId = await prisma.user.findUnique({
      where: {
        googleId: googleId
      },
      select: {
        id: true
      }
    });

    if(!userId)
      throw new Error("Usuário não localizado");

    return userId.id;
  }
  
  async getUserInfo(userId: string) : Promise<UserInfoDto> {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    if(!userInfo)
      throw new Error("Usuário não localizado");

    return userInfo;
  }
}