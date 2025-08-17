import { attributesModule } from "../attributes/attributes.module.js";
import { AttributesSheetsService } from "./Domain/services/attributesSheetsService.js";
import { CreateAttributeSheetFacade } from "./Infra/Facades/createAttributeSheetFacade.js";

function buildAttributesSheetsModule() {

  const attributeSheetService = new AttributesSheetsService();

  const createAttributeSheetFacade = new CreateAttributeSheetFacade(
    attributesModule.attributeUtilsService, 
    attributesModule.attributeService, 
    attributeSheetService
  ); 

  return {
    attributeSheetService,
    createAttributeSheetFacade,
  };
}

export const attributesSheetsModule = buildAttributesSheetsModule();