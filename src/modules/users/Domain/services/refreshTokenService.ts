import { prisma } from "../../../../prisma/index.js";

interface refreshToken {
  id: string;
  refreshToken: string;
  userId: string;
}

export class RefreshTokenService{
  private async _create(refreshToken: string, userId: string){
    if(await this.verifyIfExists(userId)){
      throw new Error("Já existe um refreshToken para esse usuário");
    }

    const newRefreshToken = await prisma.refreshToken.create({
      data: {
        refreshToken: refreshToken,
        user: {
          connect: {
            id: userId
          }
        }
      },
      select: {
        id: true
      }
    });

    return newRefreshToken.id;
  
  }

  private async verifyIfExists(userId: string) : Promise<boolean> {
    try{
      const refreshToken = await prisma.refreshToken.findUnique({
        where: {
          id: userId
        },
        select: {
          refreshToken: true,
          id: true
        }
      });

      return refreshToken != null;
      
    }
    catch(error){
      throw new Error("Erro ao verificar se existe um refresh token");
    }
  }

  

  private async _update(newRefreshToken: string, userId: string) : Promise<string> {
    try{
      const refreshTokeId = await prisma.refreshToken.update({
        where: {
          userId: userId
        },
        data: {
          refreshToken: newRefreshToken
        },
        select: {
          id: true
        }
      });

      return refreshTokeId.id;
      
    }
    catch(error){
      throw new Error("Erro durante o update do refresh token");
    }
  }



  async get(userId: string): Promise<refreshToken | null>{
    const actualRefreshToken: refreshToken | null = await prisma.refreshToken.findUnique({
      where: {
        userId: userId
      }
    });

    return actualRefreshToken;
  }

  async save(refreshToken: string, userId: string) : Promise<string> {
    let actualRefreshToken = await this.get(userId);

    if(!actualRefreshToken){
      await this._create(refreshToken, userId);
      actualRefreshToken = await this.get(userId);
    }

    const refreshTokeId = this._update(refreshToken, userId);

    return refreshTokeId;
  }
}