import { getTokenService } from "../users/users.module.js";
import { SheetsService } from "./Domain/services/sheetsServices.js";
import { CreateSheetFacade } from "./Infra/Facade/createSheetFacade.js";
import { GetSheetsFacade } from "./Infra/Facade/getSheetsFacade.js";

const sheetsService = new SheetsService();
const tokenService = getTokenService();

const getSheetsFacade = new GetSheetsFacade(tokenService, sheetsService);
const createSheetFacade = new CreateSheetFacade(tokenService, sheetsService);


export function getGetSheetsFacade(){
  return getSheetsFacade;
}

export function getCreateSheetFacade(){
  return createSheetFacade;
}
