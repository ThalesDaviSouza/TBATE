import { attributesSheetsModule } from "../attributesSheets/attributesSheets.module.js";
import { usersModule } from "../users/users.module.js";
import { SheetsService } from "./Domain/services/sheetsServices.js";
import { CreateSheetFacade } from "./Infra/Facade/createSheetFacade.js";
import { GetSheetsFacade } from "./Infra/Facade/getSheetsFacade.js";

function buildSheetsModule() {
  const sheetsService = new SheetsService();

  const getSheetsFacade = new GetSheetsFacade(
    usersModule.tokenService,
    sheetsService
  );

  const createSheetFacade = new CreateSheetFacade(
    usersModule.tokenService, 
    sheetsService, 
    attributesSheetsModule.createAttributeSheetFacade
  );

  return {
    sheetsService,
    getSheetsFacade,
    createSheetFacade,
  };
}

export const sheetsModule = buildSheetsModule();