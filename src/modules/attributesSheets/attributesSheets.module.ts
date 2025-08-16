import { getAttributeService, getAttributeUtilsService } from "../attributes/attributes.module.js";
import { AttributesSheetsService } from "./Domain/services/attributesSheetsService.js";
import { CreateAttributeSheetFacade } from "./Infra/Facades/createAttributeSheetFacade.js";

const attributeUtilsService = getAttributeUtilsService();
const attributeService = getAttributeService();

const attributeSheetService = new AttributesSheetsService();

const createAttributeSheetFacade = new CreateAttributeSheetFacade(attributeUtilsService, attributeService, attributeSheetService); 

export function getCreateAttributeSheetFacade(){
  return createAttributeSheetFacade;
}