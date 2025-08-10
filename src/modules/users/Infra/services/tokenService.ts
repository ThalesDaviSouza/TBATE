import { OAuth2Token } from "@fastify/oauth2";
import { FastifyInstance } from "fastify";

type GoogleUserInfo = {
  id: string,
  email: string,
  name: string
};


export class TokenService {
  async getUserDataFromToken(token: OAuth2Token): Promise<GoogleUserInfo>{
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

    return userInfo;
  }

  generateAcessToken(app: FastifyInstance, userId: string, email: string, name: string){
    return app.jwt.sign({
      id: userId,
      email: email,
      name: name 
    }, 
    { 
      expiresIn: '10m' 
    });
  }
  
  generateRefreshToken(app: FastifyInstance, userId: string){
    return app.jwt.sign({
      id: userId,
      type: 'refresh'
    }, 
    { 
      expiresIn: '1h' 
    });
  }

  verifyTokenIsValid(app: FastifyInstance, tokenJwt: string): boolean{
    try{
      app.jwt.verify(tokenJwt);

      return true;
    }
    catch{
      return false;
    }
  }
}