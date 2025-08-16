import { TokenService } from "../users/Infra/services/tokenService.js";
import { SheetsService } from "./Domain/services/sheetsServices.js";

const sheetsService = new SheetsService();
const tokenService = new TokenService();

export function getSheetsService(){
  return sheetsService;
}

export function getTokenService(){
  return tokenService;
}
